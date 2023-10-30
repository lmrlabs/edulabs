import Link from 'next/link';
import Image from 'next/image';
import logo from '../../components/ui/logo.png'

const ImageButton: React.FC = () => {
    return (
        <Link href="/">

                <Image src={logo} alt="Navigate Home" width={75} height={75} />
        </Link>
    );
}

export default ImageButton;
