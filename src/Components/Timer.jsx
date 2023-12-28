import React, { useState, useEffect } from "react";

const Timer = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    const changeHours = (e) => {
        setHours(parseInt(e.target.value, 10));
    };
    const changeMinutes = (e) => {
        setMinutes(parseInt(e.target.value, 10));
    };
    const changeSeconds = (e) => {
        setSeconds(parseInt(e.target.value, 10));
    };

    const startTimer = () => {
        setTimerActive(true);
    };

    const cancelTimer = () => {
        setTimerActive(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    useEffect(() => {
        let timerInterval;

        if (timerActive) {
            const totalSeconds = hours * 3600 + minutes * 60 + seconds;
            let remainingSeconds = totalSeconds;

            timerInterval = setInterval(() => {
                if (remainingSeconds <= 0) {
                    alert("Время истекло");
                    setTimerActive(false);
                    clearInterval(timerInterval);
                } else {
                    remainingSeconds -= 1;
                    const newHours = Math.floor(remainingSeconds / 3600);
                    const newMinutes = Math.floor(
                        (remainingSeconds % 3600) / 60
                    );
                    const newSeconds = remainingSeconds % 60;
                    setHours(newHours);
                    setMinutes(newMinutes);
                    setSeconds(newSeconds);
                }
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [timerActive]);

    return (
        <div className="timer">
            <div className="timer-numbers">
                <span>{hours < 10 ? `0${hours}` : hours}</span>:
                <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
                <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
            <div>
                <label>Часы</label>
                <input
                    type="number"
                    value={hours}
                    onChange={changeHours}
                    disabled={timerActive}
                />
            </div>
            <div>
                <label>Минуты</label>
                <input
                    type="number"
                    value={minutes}
                    onChange={changeMinutes}
                    disabled={timerActive}
                />
            </div>
            <div>
                <label>Секунды</label>
                <input
                    type="number"
                    value={seconds}
                    onChange={changeSeconds}
                    disabled={timerActive}
                />
            </div>
            <div>
                {timerActive ? (
                    <button onClick={cancelTimer}>Отменить</button>
                ) : (
                    <button onClick={startTimer}>Запустить</button>
                )}
            </div>
        </div>
    );
};

export default Timer;
