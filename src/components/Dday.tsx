import { useEffect, useState } from "react";

const Dday = () => {
    const [dday, setDday] = useState<number | null>(null); // 🔹 D-Day 상태 추가

    useEffect(() => {
        // D-Day 계산 로직
        const weddingDate = new Date("2025-04-05");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diff = weddingDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

        setDday(daysLeft);
    }, []);
    return (
        // {/* 🔹 D-Day 표시 */}
        <p className="dday-text">D - {dday !== null ? dday : "..."}</p>
    );
};

export default Dday;
