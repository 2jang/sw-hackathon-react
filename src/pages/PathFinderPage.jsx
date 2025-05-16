import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Footer } from "@/widgets/layout";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI";
import buildings from "@/data/buildings";  // 빌딩 데이터 임포트

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

// 디버그 모드 변수 추가
const DEBUG_MODE = true; // true일 때만 측정 모드 버튼 표시

export function Suwon_navi() {
    const [clickedPoints, setClickedPoints] = useState([]);
    const [pathInfo, setPathInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [straightDistance, setStraightDistance] = useState(null);
    const [measureMode, setMeasureMode] = useState(false); // 측정 모드 상태
    const [measuredPoints, setMeasuredPoints] = useState([]); // 측정된 좌표
    const [currentMousePosition, setCurrentMousePosition] = useState({ x: 0, y: 0 }); // 현재 마우스 위치
    const [imageLoaded, setImageLoaded] = useState(false); // 이미지 로드 상태
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 }); // 실제 이미지 크기
    const resultRef = useRef(null);
    const mapRef = useRef(null);
    const svgRef = useRef(null);
    const imgRef = useRef(null);

    // 측정 모드 토글
    const toggleMeasureMode = () => {
        setMeasureMode(!measureMode);
        if (measureMode) {
            // 측정 모드 종료 시 측정 좌표 초기화
            setMeasuredPoints([]);
        }
    };

    // 이미지 로드 완료 핸들러
    const handleImageLoad = () => {
        if (imgRef.current) {
            // 실제 이미지 크기 저장
            setImageSize({
                width: imgRef.current.naturalWidth,
                height: imgRef.current.naturalHeight
            });

            setImageLoaded(true);
            updateSvgSize();
        }
    };

    // SVG 크기 업데이트
    const updateSvgSize = () => {
        if (mapRef.current && svgRef.current && imgRef.current && imageLoaded) {
            const imgRect = imgRef.current.getBoundingClientRect();

            // SVG 요소 크기 설정
            svgRef.current.setAttribute('width', imgRect.width);
            svgRef.current.setAttribute('height', imgRect.height);

            // viewBox 설정
            svgRef.current.setAttribute('viewBox', `0 0 ${imageSize.width} ${imageSize.height}`);
            svgRef.current.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }
    };

    // 이미지 로드 및 창 크기 변경 시 SVG 업데이트
    useEffect(() => {
        if (imageLoaded) {
            updateSvgSize();

            const handleResize = () => {
                updateSvgSize();
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [imageLoaded]);

    // 측정 모드에서 마우스 움직임 추적
    useEffect(() => {
        if (!measureMode || !mapRef.current || !imageLoaded) return;

        const handleMouseMove = (e) => {
            const coords = getCoordinatesFromEvent(e);
            setCurrentMousePosition(coords);
        };

        const mapElement = mapRef.current;
        mapElement.addEventListener('mousemove', handleMouseMove);

        return () => {
            mapElement.removeEventListener('mousemove', handleMouseMove);
        };
    }, [measureMode, imageLoaded]);

    // 이벤트에서 SVG 좌표 계산 (개선된 방식)
    const getCoordinatesFromEvent = (e) => {
        if (!imgRef.current || !svgRef.current || !imageLoaded) return { x: 0, y: 0 };

        const imgRect = imgRef.current.getBoundingClientRect();

        // 이미지 내 상대적 위치 계산 (바운딩 확인)
        let relativeX = (e.clientX - imgRect.left) / imgRect.width;
        let relativeY = (e.clientY - imgRect.top) / imgRect.height;

        // 경계값 처리 (0~1 사이로 제한)
        relativeX = Math.max(0, Math.min(1, relativeX));
        relativeY = Math.max(0, Math.min(1, relativeY));

        // 원본 이미지 크기에 비례하는 SVG 좌표 계산
        const svgX = relativeX * imageSize.width;
        const svgY = relativeY * imageSize.height;

        return {
            x: Math.round(svgX),
            y: Math.round(svgY)
        };
    };

    // 지도 클릭 처리
    const handleMapClick = (e) => {
        e.preventDefault(); // 기본 동작 방지

        if (!imageLoaded) return;

        // 측정 모드일 때
        if (measureMode) {
            const coords = getCoordinatesFromEvent(e);

            // 측정된 점 추가 (최대 2개)
            const newPoints = [...measuredPoints];
            if (newPoints.length < 2) {
                newPoints.push(coords);
                setMeasuredPoints(newPoints);
            } else {
                // 2개 이상이면 초기화 후 새 점 추가
                setMeasuredPoints([coords]);
            }

            // 2개 점이 있으면 좌표 복사
            if (newPoints.length === 2) {
                const x1 = Math.min(newPoints[0].x, newPoints[1].x);
                const y1 = Math.min(newPoints[0].y, newPoints[1].y);
                const x2 = Math.max(newPoints[0].x, newPoints[1].x);
                const y2 = Math.max(newPoints[0].y, newPoints[1].y);

                console.log(`건물 좌표: [${x1}, ${y1}, ${x2}, ${y2}]`);

                // 클립보드에 복사
                navigator.clipboard.writeText(`[${x1}, ${y1}, ${x2}, ${y2}]`)
                    .then(() => console.log("좌표가 클립보드에 복사되었습니다."))
                    .catch(err => console.error("클립보드 복사 실패:", err));
            }

            return;
        }

        // 일반 모드 처리
        if (clickedPoints.length === 2) {
            setClickedPoints([]);
            setPathInfo(null);
            setStraightDistance(null);
            return;
        }

        const coords = getCoordinatesFromEvent(e);

        // 가장 가까운 건물 찾기
        let clickedBuilding = null;
        let minDistance = Infinity;

        buildings.forEach(building => {
            const [x1, y1, x2, y2] = building.polygon;
            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;

            const distance = Math.sqrt(Math.pow(coords.x - centerX, 2) + Math.pow(coords.y - centerY, 2));

            if (distance < minDistance) {
                minDistance = distance;
                clickedBuilding = building;
            }
        });

        if (clickedBuilding) {
            const newPoints = [...clickedPoints, clickedBuilding];
            setClickedPoints(newPoints);

            // 두 번째 지점 클릭 시 경로 계산
            if (newPoints.length === 2) {
                setTimeout(() => {
                    if (resultRef.current) {
                        resultRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 100);

                calculatePath(newPoints[0], newPoints[1]);
            }
        }
    };

    // 경로 계산 함수 - API 연동
    const calculatePath = async (startBuilding, endBuilding) => {
        setIsLoading(true);

        try {
            // API 호출 URL 구성 (프록시 경로 사용)
            const apiUrl = `/api/suwon-navi?buildings=${startBuilding.name}&buildings=${endBuilding.name}`;

            console.log("API 요청:", apiUrl); // 프록시를 통해 요청되는 URL 확인

            // API 호출
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error('경로 계산 API 요청에 실패했습니다');
            }

            const data = await response.json();
            console.log("API 응답:", data); // API 응답 콘솔에 출력

            // 직선 거리 계산 (픽셀 기반)
            const [x1, y1] = [(startBuilding.polygon[0] + startBuilding.polygon[2]) / 2, (startBuilding.polygon[1] + startBuilding.polygon[3]) / 2];
            const [x2, y2] = [(endBuilding.polygon[0] + endBuilding.polygon[2]) / 2, (endBuilding.polygon[1] + endBuilding.polygon[3]) / 2];
            const pixelDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const straightDist = Math.round(pixelDistance * 2.5); // 픽셀 거리를 실제 미터로 변환 (예시 비율)

            setStraightDistance(straightDist);

            // API에서 받은 거리(소요 시간-분)로 경로 정보 설정
            setPathInfo({
                walkTime: data.distance, // API에서 소요 시간을 받아옴
                startBuilding: startBuilding.kr_name,
                endBuilding: endBuilding.kr_name
            });

        } catch (error) {
            console.error("경로 계산 중 오류 발생:", error);

            setPathInfo({
                walkTime: "null",
                startBuilding: startBuilding.kr_name,
                endBuilding: endBuilding.kr_name
            });

            // 직선 거리 계산
            const [x1, y1] = [(startBuilding.polygon[0] + startBuilding.polygon[2]) / 2, (startBuilding.polygon[1] + startBuilding.polygon[3]) / 2];
            const [x2, y2] = [(endBuilding.polygon[0] + endBuilding.polygon[2]) / 2, (endBuilding.polygon[1] + endBuilding.polygon[3]) / 2];
            const pixelDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const straightDist = Math.round(pixelDistance * 2.5);

            setStraightDistance(straightDist);
        } finally {
            setIsLoading(false);
        }
    };




    // 선택 초기화
    const resetSelection = () => {
        setClickedPoints([]);
        setPathInfo(null);
        setStraightDistance(null);
    };

    return (
        <>
            {/* Hero Section */}
            <div className="relative flex h-[40vh] content-center items-center justify-center">
                <div className="absolute top-0 h-full w-full bg-[url('https://www.suwon.ac.kr/usr/images/suwon/college_top_technology.gif')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                캠퍼스 경로 안내
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                출발지와 목적지를 선택하여 최적 경로와 소요시간을 확인하세요
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/* 지도 섹션 */}
            <section className="-mt-26 px-4 pt-20 pb-16 md:pb-24">
                <div className="container mx-auto max-w-screen-xl">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
                            <CardBody className="p-4">
                                {/* 디버그 모드 버튼 */}
                                {DEBUG_MODE && (
                                    <div className="mb-4 flex justify-end">
                                        <Button
                                            size="sm"
                                            variant={measureMode ? "filled" : "outlined"}
                                            color={measureMode ? "red" : "gray"}
                                            onClick={toggleMeasureMode}
                                            className="text-xs"
                                        >
                                            {measureMode ? "측정 모드 종료" : "좌표 측정 모드"}
                                        </Button>
                                    </div>
                                )}

                                <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
                                    수원대학교 캠퍼스 지도
                                </Typography>

                                {/* 모드별 안내 메시지 */}
                                {measureMode ? (
                                    <Typography className="font-normal text-red-500 mb-6 text-center">
                                        좌표 측정 모드: 건물의 왼쪽 상단과 오른쪽 하단을 순서대로 클릭하세요
                                        {measuredPoints.length === 1 && " (오른쪽 하단 클릭)"}
                                    </Typography>
                                ) : (
                                    <Typography className="font-normal text-blue-gray-500 mb-6 text-center">
                                        출발 건물과 도착 건물을 순서대로 클릭하세요
                                    </Typography>
                                )}

                                {/* 지도 영역 - 이미지 및 SVG 오버레이 */}
                                <div
                                    className="relative"
                                    ref={mapRef}
                                    onClick={handleMapClick}
                                >
                                    <img
                                        ref={imgRef}
                                        src="/img/campusmap_img_2024.jpg"
                                        alt="수원대학교 캠퍼스 지도"
                                        className="w-full h-auto rounded-lg border border-gray-200"
                                        onLoad={handleImageLoad}
                                        crossOrigin="anonymous"
                                    />

                                    {/* SVG 오버레이 */}
                                    <svg
                                        ref={svgRef}
                                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                    >
                                        {/* 측정 모드 표시 요소 - 디버그 모드일 때만 표시 */}
                                        {DEBUG_MODE && measureMode && imageLoaded && (
                                            <>
                                                {/* 현재 마우스 위치에 십자선 표시 */}
                                                <line
                                                    x1={currentMousePosition.x}
                                                    y1="0"
                                                    x2={currentMousePosition.x}
                                                    y2={imageSize.height}
                                                    stroke="rgba(255, 0, 0, 0.5)"
                                                    strokeWidth="1"
                                                    strokeDasharray="5,5"
                                                />
                                                <line
                                                    x1="0"
                                                    y1={currentMousePosition.y}
                                                    x2={imageSize.width}
                                                    y2={currentMousePosition.y}
                                                    stroke="rgba(255, 0, 0, 0.5)"
                                                    strokeWidth="1"
                                                    strokeDasharray="5,5"
                                                />

                                                {/* 현재 마우스 위치 표시 */}
                                                <circle
                                                    cx={currentMousePosition.x}
                                                    cy={currentMousePosition.y}
                                                    r="4"
                                                    fill="red"
                                                />
                                                <text
                                                    x={currentMousePosition.x + 10}
                                                    y={currentMousePosition.y - 10}
                                                    fill="red"
                                                    fontSize="12"
                                                >
                                                    ({currentMousePosition.x}, {currentMousePosition.y})
                                                </text>

                                                {/* 측정된 포인트 표시 */}
                                                {measuredPoints.map((point, index) => (
                                                    <g key={`measure-${index}`}>
                                                        <circle
                                                            cx={point.x}
                                                            cy={point.y}
                                                            r="6"
                                                            fill={index === 0 ? "blue" : "green"}
                                                            stroke="#fff"
                                                            strokeWidth="2"
                                                        />
                                                        <text
                                                            x={point.x + 10}
                                                            y={point.y + 5}
                                                            fill={index === 0 ? "blue" : "green"}
                                                            fontSize="12"
                                                            fontWeight="bold"
                                                        >
                                                            {index === 0 ? "시작점" : "끝점"} ({point.x}, {point.y})
                                                        </text>
                                                    </g>
                                                ))}

                                                {/* 두 점 사이 사각형 표시 */}
                                                {measuredPoints.length === 2 && (
                                                    <rect
                                                        x={Math.min(measuredPoints[0].x, measuredPoints[1].x)}
                                                        y={Math.min(measuredPoints[0].y, measuredPoints[1].y)}
                                                        width={Math.abs(measuredPoints[1].x - measuredPoints[0].x)}
                                                        height={Math.abs(measuredPoints[1].y - measuredPoints[0].y)}
                                                        fill="rgba(0, 0, 255, 0.2)"
                                                        stroke="blue"
                                                        strokeWidth="2"
                                                        strokeDasharray="5,5"
                                                    />
                                                )}
                                            </>
                                        )}

                                        {/* 일반 모드 건물 표시 - 디버그 모드일 때만 표시 */}
                                        {DEBUG_MODE && !measureMode && buildings.map(building => {
                                            const [x1, y1, x2, y2] = building.polygon;
                                            const isSelected = clickedPoints.some(p => p.id === building.id);

                                            return (
                                                <rect
                                                    key={building.id}
                                                    x={x1}
                                                    y={y1}
                                                    width={x2 - x1}
                                                    height={y2 - y1}
                                                    fill={isSelected ? "rgba(0, 0, 0, 0.5)" : building.color}
                                                    stroke={isSelected ? "#ff0000" : "#333"}
                                                    strokeWidth={isSelected ? 3 : 1}
                                                />
                                            );
                                        })}

                                        {/* 경로 표시 - 양끝에 화살표 추가 (뒤집힌 화살표) */}
                                        {!measureMode && clickedPoints.length === 2 && (
                                            <>
                                                {/* 선 */}
                                                <line
                                                    x1={(clickedPoints[0].polygon[0] + clickedPoints[0].polygon[2]) / 2}
                                                    y1={(clickedPoints[0].polygon[1] + clickedPoints[0].polygon[3]) / 2}
                                                    x2={(clickedPoints[1].polygon[0] + clickedPoints[1].polygon[2]) / 2}
                                                    y2={(clickedPoints[1].polygon[1] + clickedPoints[1].polygon[3]) / 2}
                                                    stroke="#ff0000"
                                                    strokeWidth="3"
                                                    strokeDasharray="10,5"
                                                    markerEnd="url(#arrowEnd)"
                                                    markerStart="url(#arrowStart)"
                                                />

                                                {/* 화살표 마커 정의 */}
                                                <defs>
                                                    {/* 시작점 화살표 (왼쪽에서 오른쪽으로) */}
                                                    <marker
                                                        id="arrowStart"
                                                        markerWidth="10"
                                                        markerHeight="10"
                                                        refX="2"
                                                        refY="5"
                                                        orient="auto"
                                                    >
                                                        <path d="M2,5 L7,2 L7,8 Z" fill="#ff0000" />
                                                    </marker>

                                                    {/* 끝점 화살표 (오른쪽에서 왼쪽으로) */}
                                                    <marker
                                                        id="arrowEnd"
                                                        markerWidth="10"
                                                        markerHeight="10"
                                                        refX="8"
                                                        refY="5"
                                                        orient="auto"
                                                    >
                                                        <path d="M8,5 L3,2 L3,8 Z" fill="#ff0000" />
                                                    </marker>
                                                </defs>
                                            </>
                                        )}
                                    </svg>

                                    {/* 선택 가이드 */}
                                    {!measureMode && (
                                        <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md border border-gray-200">
                                            <Typography variant="h6" className="text-gray-800">
                                                {clickedPoints.length === 0 ? "출발지를 선택하세요" :
                                                    clickedPoints.length === 1 ? "도착지를 선택하세요" :
                                                        "경로가 계산되었습니다"}
                                            </Typography>
                                            {clickedPoints.map((point, index) => (
                                                <Typography key={index} className="text-blue-gray-700">
                                                    {index === 0 ? "출발: " : "도착: "}{point.kr_name}
                                                </Typography>
                                            ))}
                                        </div>
                                    )}

                                    {/* 측정 모드 정보 표시 */}
                                    {measureMode && measuredPoints.length === 2 && (
                                        <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md border border-red-200">
                                            <Typography variant="h6" className="text-red-800">
                                                측정 결과
                                            </Typography>
                                            <Typography className="text-blue-700 mt-1 font-mono">
                                                [{Math.min(measuredPoints[0].x, measuredPoints[1].x)},
                                                {Math.min(measuredPoints[0].y, measuredPoints[1].y)},
                                                {Math.max(measuredPoints[0].x, measuredPoints[1].x)},
                                                {Math.max(measuredPoints[0].y, measuredPoints[1].y)}]
                                            </Typography>
                                            <Typography className="text-gray-700 mt-1">
                                                크기: {Math.abs(measuredPoints[1].x - measuredPoints[0].x)} x {Math.abs(measuredPoints[1].y - measuredPoints[0].y)}
                                            </Typography>
                                            <Typography className="mt-2 text-green-700 font-semibold text-sm">
                                                좌표가 클립보드에 복사되었습니다
                                            </Typography>
                                        </div>
                                    )}
                                </div>

                                {/* 결과 영역 */}
                                {!measureMode && (
                                    <div ref={resultRef}>
                                        {/* 로딩 상태 */}
                                        {isLoading && (
                                            <div className="mt-6 text-center">
                                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                                                <Typography className="mt-2 text-gray-800">경로를 계산 중입니다...</Typography>
                                            </div>
                                        )}

                                        {/* 경로 정보 */}
                                        {pathInfo && !isLoading && (
                                            <motion.div
                                                className="mt-8"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="rounded-xl overflow-hidden">
                                                    {/* 헤더 */}
                                                    <div className=" py-3 px-4 rounded-t-xl">
                                                        <Typography variant="h5" className="text-[#1E293B] text-center font-bold">
                                                            경로 정보
                                                        </Typography>
                                                    </div>

                                                    {/* 경로 시각화 */}
                                                    <div className="p-4 flex items-center justify-center">
                                                        <div className="w-full max-w-3xl flex items-center justify-between">
                                                            <div className="text-center">
                                                                <div className="h-14 w-14 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-2">
                                                                    <Typography className="text-white font-bold">출발</Typography>
                                                                </div>
                                                                <Typography className="font-bold text-gray-900">{pathInfo.startBuilding}</Typography>
                                                            </div>

                                                            <div className="flex-1 px-4 relative">
                                                                <div className="h-1 bg-[#1E293B] w-full my-6"></div>
                                                            </div>

                                                            <div className="text-center">
                                                                <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center mx-auto mb-2 border border-gray-200 shadow-md">
                                                                    <Typography className="text-gray-900 font-bold">도착</Typography>
                                                                </div>
                                                                <Typography className="font-bold text-gray-900">{pathInfo.endBuilding}</Typography>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 하단 정보 */}
                                                    <div className="px-6 py-5">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                                                                <Typography className="text-gray-600 text-sm mb-1">예상 소요시간</Typography>
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                    </svg>
                                                                    <Typography className="font-bold text-lg text-gray-900">약 {pathInfo.walkTime}분</Typography>
                                                                </div>
                                                            </div>

                                                            <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-200 shadow-sm">
                                                                <Typography className="text-gray-600 text-sm mb-1">직선 거리</Typography>
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                    </svg>
                                                                    <Typography className="font-bold text-lg text-gray-900">{straightDistance}m</Typography>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-5 flex justify-center">
                                                            <Button
                                                                size="lg"
                                                                variant="text"
                                                                color="[#1E293B]"
                                                                onClick={resetSelection}
                                                                className="hover:bg-gray-100 transition-all duration-300"
                                                            >
                                                                다시 선택하기
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <div className="bg-white">
                <Footer />
            </div>
            <ChatbotUI />
        </>
    );
}

export default Suwon_navi;