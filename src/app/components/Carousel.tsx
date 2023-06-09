import Image from "next/image";

const Carousel = () => {

    const images: number[]  = Array(5).fill(0).map((_, index) => index)

    return (
        <div className="w-[200%] h-20 border-gray-600 overflow-hidden">
            <div className="w-[200%] flex items-center h-20 justify-around animate gap-20 animate-carousel">
                {images.map((image, index) => (
                    <div key={index} className="w-20 h-20 bg-gray-400 rounded-full">
                        <Image src={`https://picsum.photos/200/300?random=${image}`} alt="" className="w-full h-full object-cover"/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carousel