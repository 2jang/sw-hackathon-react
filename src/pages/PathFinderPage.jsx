import React, { useState, useRef, useEffect } from "react";
import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/widgets/layout";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI";
import buildings from "@/data/buildings";

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

const DEBUG_MODE = false;

const ToastIcons = {
    info: (
        <svg className="w-5 h-5 mr-3 inline shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
        </svg>
    ),
    error: (
        <svg className="w-5 h-5 mr-3 inline shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z" clipRule="evenodd"></path>
        </svg>
    ),
    success: (
        <svg className="w-5 h-5 mr-3 inline shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
        </svg>
    ),
};


export function Suwon_navi() {
    const [clickedPoints, setClickedPoints] = useState([]);
    const [pathInfo, setPathInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [straightDistance, setStraightDistance] = useState(null);
    const [measureMode, setMeasureMode] = useState(false);
    const [measuredPoints, setMeasuredPoints] = useState([]);
    const [currentMousePosition, setCurrentMousePosition] = useState({ x: 0, y: 0 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const resultRef = useRef(null);
    const mapRef = useRef(null);
    const svgRef = useRef(null);
    const imgRef = useRef(null);
    const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

    const showToast = (message, type = 'info', duration = 3000) => {
        setToast({ visible: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
        }, duration);
    };

    const toggleMeasureMode = () => {
        setMeasureMode(!measureMode);
        if (measureMode) {
            setMeasuredPoints([]);
        }
        setClickedPoints([]);
        setPathInfo(null);
        setStraightDistance(null);
    };

    const handleImageLoad = () => {
        if (imgRef.current) {
            setImageSize({
                width: imgRef.current.naturalWidth,
                height: imgRef.current.naturalHeight
            });
            setImageLoaded(true);
        }
    };

    const updateSvgSize = () => {
        if (mapRef.current && svgRef.current && imgRef.current && imageLoaded) {
            const imgRect = imgRef.current.getBoundingClientRect();
            svgRef.current.setAttribute('width', imgRect.width);
            svgRef.current.setAttribute('height', imgRect.height);
            svgRef.current.setAttribute('viewBox', `0 0 ${imageSize.width} ${imageSize.height}`);
            svgRef.current.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }
    };

    useEffect(() => {
        if (imageLoaded) {
            updateSvgSize();
            const handleResize = () => updateSvgSize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [imageLoaded, imageSize.width, imageSize.height]);


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
    }, [measureMode, imageLoaded, imageSize.width, imageSize.height]);

    const getCoordinatesFromEvent = (e) => {
        if (!imgRef.current || !svgRef.current || !imageLoaded || !imageSize.width || !imageSize.height) return { x: 0, y: 0 };
        const imgRect = imgRef.current.getBoundingClientRect();
        let relativeX = (e.clientX - imgRect.left) / imgRect.width;
        let relativeY = (e.clientY - imgRect.top) / imgRect.height;
        relativeX = Math.max(0, Math.min(1, relativeX));
        relativeY = Math.max(0, Math.min(1, relativeY));
        const svgX = relativeX * imageSize.width;
        const svgY = relativeY * imageSize.height;
        return {
            x: Math.round(svgX),
            y: Math.round(svgY)
        };
    };

    const findBuildingAtCoordinates = (coords) => {
        let closestBuilding = null;
        let minDistance = Infinity;
        const MAX_CLICK_DISTANCE_THRESHOLD = imageSize.width > 0 ? Math.max(imageSize.width / 20, 30) : 50;

        buildings.forEach(building => {
            const [x1, y1, x2, y2] = building.polygon;
            const centerX = (x1 + x2) / 2;
            const centerY = (y1 + y2) / 2;
            const distanceToCenter = Math.sqrt(Math.pow(coords.x - centerX, 2) + Math.pow(coords.y - centerY, 2));
            const isInsideBoundingBox = coords.x >= x1 && coords.x <= x2 && coords.y >= y1 && coords.y <= y2;

            if (isInsideBoundingBox) {
                if (distanceToCenter < minDistance) {
                    minDistance = distanceToCenter;
                    closestBuilding = building;
                }
            } else if (!closestBuilding && distanceToCenter < MAX_CLICK_DISTANCE_THRESHOLD && distanceToCenter < minDistance) {
                minDistance = distanceToCenter;
                closestBuilding = building;
            }
        });
        return closestBuilding;
    };

    const handleMapClick = (e) => {
        e.preventDefault();
        if (!imageLoaded) return;
        const coords = getCoordinatesFromEvent(e);

        if (measureMode) {
            const newPoints = [...measuredPoints];
            if (newPoints.length < 2) {
                newPoints.push(coords);
                setMeasuredPoints(newPoints);
            } else {
                setMeasuredPoints([coords]);
            }
            if (newPoints.length === 2) {
                const x1 = Math.min(newPoints[0].x, newPoints[1].x);
                const y1 = Math.min(newPoints[0].y, newPoints[1].y);
                const x2 = Math.max(newPoints[0].x, newPoints[1].x);
                const y2 = Math.max(newPoints[0].y, newPoints[1].y);
                navigator.clipboard.writeText(`[${x1}, ${y1}, ${x2}, ${y2}]`)
                    .then(() => showToast("좌표가 클립보드에 복사되었습니다.", "success"))
                    .catch(err => {
                        console.error("클립보드 복사 실패:", err);
                        showToast("클립보드 복사에 실패했습니다.", "error");
                    });
            }
            return;
        }

        const clickedOnBuilding = findBuildingAtCoordinates(coords);
        if (clickedOnBuilding) {
            const newPointData = { building: clickedOnBuilding, clickCoords: coords };
            if (clickedPoints.length === 0) {
                setClickedPoints([newPointData]);
                setPathInfo(null);
                setStraightDistance(null);
            } else if (clickedPoints.length === 1) {
                const currentStartPoint = clickedPoints[0];
                if (currentStartPoint.building.id === clickedOnBuilding.id) {
                    showToast("출발지와 도착지가 같은 건물입니다.", "error");
                } else {
                    const newPoints = [currentStartPoint, newPointData];
                    setClickedPoints(newPoints);
                    setTimeout(() => {
                        if (resultRef.current) {
                            resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 100);
                    calculatePath(currentStartPoint.building, clickedOnBuilding);
                }
            } else {
                setClickedPoints([newPointData]);
                setPathInfo(null);
                setStraightDistance(null);
            }
        } else {
            if (clickedPoints.length === 2) {
                resetSelection();
            }
        }
    };

    const calculatePath = async (startBuilding, endBuilding) => {
        if (!startBuilding || typeof startBuilding.name !== 'string' || startBuilding.name.trim() === '' ||
            !endBuilding || typeof endBuilding.name !== 'string' || endBuilding.name.trim() === '') {
            console.error("경로 계산을 위한 출발지 또는 도착지 정보가 유효하지 않습니다.", { startBuilding, endBuilding });
            showToast("출발지 또는 도착지 정보가 올바르지 않습니다. 다시 선택해주세요.", "error", 4000);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const apiUrl = `http://ahnai1.suwon.ac.kr:5041/suwon-navi?buildings=${startBuilding.name}&buildings=${endBuilding.name}`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(` ${response.status} ${errorData}`);
            }
            const data = await response.json();

            // 건물 중심점 계산
            const [x1_center, y1_center] = [(startBuilding.polygon[0] + startBuilding.polygon[2]) / 2, (startBuilding.polygon[1] + startBuilding.polygon[3]) / 2];
            const [x2_center, y2_center] = [(endBuilding.polygon[0] + endBuilding.polygon[2]) / 2, (endBuilding.polygon[1] + endBuilding.polygon[3]) / 2];

            // 픽셀 거리 계산
            const pixelDistance = Math.sqrt(Math.pow(x2_center - x1_center, 2) + Math.pow(y2_center - y1_center, 2));

            // 인문사회융합대학과 글로벌인재대학 사이의 거리를 기준으로 축척 계산
            // buildings의 ID 1(인문사회융합대학)과 ID 20(글로벌인재대학)의 중심점 좌표
            const humanitiesCollege = buildings.find(b => b.id === 1);
            const globalTalentCollege = buildings.find(b => b.id === 20);

            const [hum_x_center, hum_y_center] = [(humanitiesCollege.polygon[0] + humanitiesCollege.polygon[2]) / 2,
                (humanitiesCollege.polygon[1] + humanitiesCollege.polygon[3]) / 2];
            const [glob_x_center, glob_y_center] = [(globalTalentCollege.polygon[0] + globalTalentCollege.polygon[2]) / 2,
                (globalTalentCollege.polygon[1] + globalTalentCollege.polygon[3]) / 2];

            // 인문사회융합대학과 글로벌인재대학 사이의 픽셀 거리
            const referencePixelDistance = Math.sqrt(Math.pow(glob_x_center - hum_x_center, 2) + Math.pow(glob_y_center - hum_y_center, 2));

            // 축척 계산: 실제 거리(m) / 픽셀 거리 = 840m / referencePixelDistance
            const scale = 840 / referencePixelDistance;

            // 선택한 두 건물 사이의 실제 거리(미터) 계산
            const straightDist = Math.round(pixelDistance * scale);

            setStraightDistance(straightDist);
            setPathInfo({
                walkTime: data.distance,
                startBuilding: startBuilding.kr_name,
                endBuilding: endBuilding.kr_name
            });
        } catch (error) {
            console.error("경로 계산 중 오류 발생:", error);
            showToast(`경로 계산 오류:${error.message.length > 100 ? error.message.substring(0,100)+'...' : error.message}`, "error", 5000);
            setPathInfo({
                walkTime: "N/A",
                startBuilding: startBuilding.kr_name,
                endBuilding: endBuilding.kr_name
            });

            // 오류 발생 시에도 거리는 계산하여 표시
            const [x1_center, y1_center] = [(startBuilding.polygon[0] + startBuilding.polygon[2]) / 2, (startBuilding.polygon[1] + startBuilding.polygon[3]) / 2];
            const [x2_center, y2_center] = [(endBuilding.polygon[0] + endBuilding.polygon[2]) / 2, (endBuilding.polygon[1] + endBuilding.polygon[3]) / 2];
            const pixelDistance = Math.sqrt(Math.pow(x2_center - x1_center, 2) + Math.pow(y2_center - y1_center, 2));

            // 인문사회융합대학과 글로벌인재대학 사이의 거리를 기준으로 축척 계산
            const humanitiesCollege = buildings.find(b => b.id === 1);
            const globalTalentCollege = buildings.find(b => b.id === 20);

            const [hum_x_center, hum_y_center] = [(humanitiesCollege.polygon[0] + humanitiesCollege.polygon[2]) / 2,
                (humanitiesCollege.polygon[1] + humanitiesCollege.polygon[3]) / 2];
            const [glob_x_center, glob_y_center] = [(globalTalentCollege.polygon[0] + globalTalentCollege.polygon[2]) / 2,
                (globalTalentCollege.polygon[1] + globalTalentCollege.polygon[3]) / 2];

            const referencePixelDistance = Math.sqrt(Math.pow(glob_x_center - hum_x_center, 2) + Math.pow(glob_y_center - hum_y_center, 2));
            const scale = 840 / referencePixelDistance;
            const straightDist = Math.round(pixelDistance * scale);

            setStraightDistance(straightDist);
        } finally {
            setIsLoading(false);
        }
    };

    const resetSelection = () => {
        setClickedPoints([]);
        setPathInfo(null);
        setStraightDistance(null);
    };

    return (
        <>
            <AnimatePresence>
                {toast.visible && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeOut" } }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.4 }}
                        className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 
                                    bg-white text-gray-800 p-3 px-4 rounded-lg border border-gray-300 shadow-xl 
                                    z-[9999] text-sm flex items-center w-auto max-w-[90vw] sm:max-w-md`} // 반응형 max-width
                    >
                        {ToastIcons[toast.type] || ToastIcons.info}
                        <span className="break-words">{toast.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative flex h-[40vh] content-center items-center justify-center">
                <div className="absolute top-0 h-full w-full bg-[url('https://www.suwon.ac.kr/usr/images/suwon/college_top_technology.gif')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography variant="h1" color="white" className="mb-6 font-black">
                                수벅수벅
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                출발지와 목적지를 선택하여 최적 경로와 소요시간을 확인하세요
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

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
                                <div
                                    className="relative"
                                    ref={mapRef}
                                    onClick={handleMapClick}
                                    style={{ cursor: imageLoaded && !measureMode ? 'pointer' : 'default' }}
                                >
                                    <img
                                        ref={imgRef}
                                        src="/img/campusmap_img_2024.jpg"
                                        alt="수원대학교 캠퍼스 지도"
                                        className="w-full h-auto rounded-lg border border-gray-200"
                                        onLoad={handleImageLoad}
                                        crossOrigin="anonymous"
                                    />
                                    {imageLoaded && (
                                        <svg
                                            ref={svgRef}
                                            className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                        >
                                            {DEBUG_MODE && (
                                                <>
                                                    {/* 디버깅 모드에서 buildings 데이터를 이용한 SVG 도형 그리기 */}
                                                    {buildings.map((building) => (
                                                        <rect
                                                            key={`debug-building-${building.id}`}
                                                            x={building.polygon[0]}
                                                            y={building.polygon[1]}
                                                            width={building.polygon[2] - building.polygon[0]}
                                                            height={building.polygon[3] - building.polygon[1]}
                                                            fill={building.color}
                                                            stroke="#000000"
                                                            strokeWidth="1"
                                                        />
                                                    ))}
                                                </>
                                            )}

                                            {DEBUG_MODE && measureMode && (
                                                <>
                                                    <line x1={currentMousePosition.x} y1="0" x2={currentMousePosition.x} y2={imageSize.height} stroke="rgba(255, 0, 0, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                                                    <line x1="0" y1={currentMousePosition.y} x2={imageSize.width} y2={currentMousePosition.y} stroke="rgba(255, 0, 0, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                                                    <circle cx={currentMousePosition.x} cy={currentMousePosition.y} r="4" fill="red" />
                                                    <text x={currentMousePosition.x + 10} y={currentMousePosition.y - 10} fill="red" fontSize="12">
                                                        ({currentMousePosition.x}, {currentMousePosition.y})
                                                    </text>
                                                    {measuredPoints.map((point, index) => (
                                                        <g key={`measure-${index}`}>
                                                            <circle cx={point.x} cy={point.y} r="6" fill={index === 0 ? "blue" : "green"} stroke="#fff" strokeWidth="2" />
                                                            <text x={point.x + 10} y={point.y + 5} fill={index === 0 ? "blue" : "green"} fontSize="12" fontWeight="bold">
                                                                {index === 0 ? "시작점" : "끝점"} ({point.x}, {point.y})
                                                            </text>
                                                        </g>
                                                    ))}
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

                                            {!measureMode && clickedPoints.map((point, index) => (
                                                <circle
                                                    key={`selected-building-${point.building.id}-${index}`}
                                                    cx={point.clickCoords.x}
                                                    cy={point.clickCoords.y}
                                                    r="8"
                                                    fill={point.building.color || 'rgba(0, 100, 255, 0.8)'}
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                />
                                            ))}

                                            {!measureMode && clickedPoints.length === 2 && (
                                                <>
                                                    <defs>
                                                        <marker id="markerArrowStart" viewBox="0 0 10 10" refX="0" refY="5"
                                                                markerUnits="strokeWidth" markerWidth="6" markerHeight="5"
                                                                orient="auto">
                                                            <path d="M10,0 L0,5 L10,10 Z" fill="#ff0000" />
                                                        </marker>
                                                        <marker id="markerArrowEnd" viewBox="0 0 10 10" refX="10" refY="5"
                                                                markerUnits="strokeWidth" markerWidth="6" markerHeight="5"
                                                                orient="auto">
                                                            <path d="M0,0 L10,5 L0,10 Z" fill="#ff0000" />
                                                        </marker>
                                                    </defs>
                                                    <line
                                                        x1={clickedPoints[0].clickCoords.x}
                                                        y1={clickedPoints[0].clickCoords.y}
                                                        x2={clickedPoints[1].clickCoords.x}
                                                        y2={clickedPoints[1].clickCoords.y}
                                                        stroke="#ff0000"
                                                        strokeWidth="3"
                                                        strokeDasharray="10,5"
                                                        markerEnd="url(#markerArrowEnd)"
                                                        markerStart="url(#markerArrowStart)"
                                                    />
                                                </>
                                            )}
                                        </svg>
                                    )}
                                </div>

                                {!measureMode && (
                                    <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md border border-gray-200 pointer-events-none max-w-[calc(100%-3rem)] [@media(max-width:430px)]:mb-[90px] [@media(max-width:430px)]:opacity-0">
                                        <Typography variant="h6" className="text-gray-800 text-sm md:text-base leading-tight">
                                            {clickedPoints.length === 0 ? "출발지를 선택하세요." :
                                                clickedPoints.length === 1 ? `출발: ${clickedPoints[0].building.kr_name}` :
                                                    "경로가 계산되었습니다."}
                                        </Typography>
                                        {clickedPoints.length === 1 && (
                                            <Typography className="text-blue-gray-600 text-xs md:text-sm leading-tight">도착지를 선택하세요.</Typography>
                                        )}
                                        {clickedPoints.length === 2 && pathInfo && (
                                            <>
                                                <Typography className="text-blue-gray-700 text-xs md:text-sm leading-tight mt-1">
                                                    출발: {pathInfo.startBuilding}
                                                </Typography>
                                                <Typography className="text-blue-gray-700 text-xs md:text-sm leading-tight">
                                                    도착: {pathInfo.endBuilding}
                                                </Typography>
                                            </>
                                        )}
                                    </div>
                                )}

                                {measureMode && measuredPoints.length === 2 && (
                                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-md border border-red-200 pointer-events-none">
                                        <Typography variant="h6" className="text-red-800 text-sm">
                                            측정 결과
                                        </Typography>
                                        <Typography className="text-blue-700 mt-1 font-mono text-xs break-all">
                                            [{Math.min(measuredPoints[0].x, measuredPoints[1].x)},&nbsp;
                                            {Math.min(measuredPoints[0].y, measuredPoints[1].y)},&nbsp;
                                            {Math.max(measuredPoints[0].x, measuredPoints[1].x)},&nbsp;
                                            {Math.max(measuredPoints[0].y, measuredPoints[1].y)}]
                                        </Typography>
                                        <Typography className="text-gray-700 mt-1 text-xs">
                                            크기: {Math.abs(measuredPoints[1].x - measuredPoints[0].x)} x {Math.abs(measuredPoints[1].y - measuredPoints[0].y)}
                                        </Typography>
                                    </div>
                                )}

                                {!measureMode && (
                                    <div ref={resultRef} className="mt-6">
                                        {isLoading && (
                                            <div className="mt-6 text-center">
                                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                                                <Typography className="mt-2 text-gray-800">경로를 계산 중입니다...</Typography>
                                            </div>
                                        )}
                                        {pathInfo && !isLoading && (
                                            <motion.div
                                                className="mt-2"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="rounded-xl overflow-hidden">
                                                    <div className="py-3 px-4 rounded-t-xl">
                                                        <Typography variant="h5" className="text-[#1E293B] text-center font-bold">
                                                            경로 정보
                                                        </Typography>
                                                    </div>
                                                    <div className="p-4 flex items-center justify-center">
                                                        <div className="w-full max-w-3xl flex items-center justify-between">
                                                            <div className="text-center flex-shrink-0 w-1/3 px-1">
                                                                <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-2 shadow-md">
                                                                    <Typography className="text-white font-bold text-xs md:text-sm">출발</Typography>
                                                                </div>
                                                                <Typography className="font-semibold text-gray-800 text-xs md:text-sm break-words">{pathInfo.startBuilding}</Typography>
                                                            </div>
                                                            <div className="flex-1 px-2 md:px-4 relative">
                                                                <div className="h-1 bg-gray-300 w-full my-6"></div>
                                                            </div>
                                                            <div className="text-center flex-shrink-0 w-1/3 px-1">
                                                                <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-white flex items-center justify-center mx-auto mb-2 border border-gray-300 shadow-md">
                                                                    <Typography className="text-gray-800 font-bold text-xs md:text-sm">도착</Typography>
                                                                </div>
                                                                <Typography className="font-semibold text-gray-800 text-xs md:text-sm break-words">{pathInfo.endBuilding}</Typography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="py-4 rounded-b-xl">
                                                        <div className="px-4 md:px-6 py-5 rounded-b-xl">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="bg-white rounded-lg p-2 text-center border border-gray-200 shadow-sm">
                                                                    <Typography className="text-gray-500 text-[11px] md:text-xs mb-0.5">예상 소요시간</Typography>
                                                                    <div className="flex items-center justify-center gap-1">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <Typography
                                                                            className={`font-bold text-lg md:text-xl ${
                                                                                pathInfo.walkTime === "N/A" ? "text-gray-800" :
                                                                                    parseInt(pathInfo.walkTime) <= 10 ? "text-green-500" :
                                                                                        parseInt(pathInfo.walkTime) <= 20 ? "text-orange-500" :
                                                                                            "text-red-500"
                                                                            }`}
                                                                        >
                                                                            {pathInfo.walkTime === "N/A" ? "정보 없음" : `약 ${pathInfo.walkTime}분`}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-white rounded-lg p-2 text-center border border-gray-200 shadow-sm">
                                                                    <Typography className="text-gray-500 text-[11px] md:text-xs mb-0.5">직선 거리</Typography>
                                                                    <div className="flex items-center justify-center gap-1">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                                        </svg>
                                                                        <Typography className="font-bold text-lg md:text-xl text-gray-800">
                                                                            {straightDistance !== null ? `${straightDistance}m` : "계산 중..."}
                                                                        </Typography>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 flex justify-center">
                                                            <Button
                                                                size="md"
                                                                variant="text"
                                                                color="gray"
                                                                onClick={resetSelection}
                                                                className="hover:bg-gray-200 transition-all duration-300 text-gray-700"
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