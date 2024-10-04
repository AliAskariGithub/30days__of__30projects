"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";

export default function CountdownTimer() {

    const [duration, setDuration] = useState<number | string>("");

    const [timeLeft, setTimeLeft] = useState<number>(0);

    const [isActive, setIsActive] = useState<boolean>(false);

    const [isPaused, setIsPaused] = useState<boolean>(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);


    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0) {
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };


    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };


    const handlePause = (): void => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };


    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };


    useEffect(() => {

        if (isActive && !isPaused) {

            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {

                    if (prevTime <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }

                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, isPaused]);


    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}`;
    };


    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };


    return (

        <div className="flex flex-col items-center justify-center h-screen bg-[url('https://static.vecteezy.com/system/resources/thumbnails/002/174/599/small/realistic-brown-wood-template-free-vector.jpg')] bg-cover bg-center  w-full text-white">

            <div className=" shadow-lg rounded-lg p-8 w-full max-w-md custom-bg-color text-white custom-border">

                <h1 className="text-3xl mb-8  text-center uppercase custom-bg-color custom-spacing text-white font-extrabold">
                    Countdown Timer
                </h1>

                <div className="flex items-center mb-6">
                    <input
                        type="number"
                        id="duration"
                        placeholder="  Enter Time duration in seconds"
                        value={duration}
                        onChange={handleDurationChange}
                        className="flex-1 mr-4 rounded-md border-white dark:border-white text-black font-semibold pl-3"
                    />
                    <button
                        onClick={handleSetDuration}
                        className="custom-text-color hover:text-white font-semibold"
                    >
                        Set
                    </button>
                </div>

                <div className="text-6xl font-bold text-white mb-8 text-center">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex justify-center gap-4">

                    <button
                        onClick={handleStart}
                        className="custom-text-color hover:text-white font-semibold">
                        {isPaused ? "Resume" : "Start"}
                    </button>

                    <button
                        onClick={handlePause}
                        className="custom-text-color hover:text-white font-semibold">Pause
                    </button>

                    <button
                        onClick={handleReset}
                        className="custom-text-color hover:text-white font-semibold">Reset
                    </button>

                </div>
            </div>
        </div>
    );
}
