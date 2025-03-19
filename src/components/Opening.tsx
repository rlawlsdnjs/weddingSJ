import { motion } from "framer-motion";
import pinkFlower from "../../public/pinkflowerResize.png";

interface OpeningProps {
    onFinish: () => void;
}

const Opening = ({ onFinish }: OpeningProps) => {
    return (
        <motion.div
            className="opening-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 2, // 페이드 인 속도
                exit: { duration: 3 }, // 페이드 아웃 속도
            }}
            onAnimationComplete={onFinish}
            style={{
                background:
                    "linear-gradient(to bottom, #ffffff, rgb(255, 238, 238))",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100dvw",
                height: "100dvh",
                textAlign: "center",
                maxWidth: "500px",
            }}>
            {/* 이미지 애니메이션 */}
            <motion.img
                src={pinkFlower}
                alt="opening image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                style={{ maxWidth: "60px", marginBottom: "20px" }}
            />

            {/* 텍스트 애니메이션 */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }} // 이미지 등장 후 0.5초 지연
                style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#333",
                    fontFamily: "Nanum Myeongjo, serif",
                }}>
                화사한 봄날, 진원 & 소라
            </motion.h1>
        </motion.div>
    );
};

export default Opening;
