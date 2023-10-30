import Link from 'next/link';
import Image from 'next/image';

const ImageButton: React.FC = () => {
    return (
        <Link href="/">
            <a>
                <Image src="../logo-main.png" alt="Navigate Home" width={100} height={100} />
            </a>
        </Link>
    );
}

export default ImageButton;
