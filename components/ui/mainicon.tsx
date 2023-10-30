import Link from 'next/link';
import Image from 'next/image';
import logo from '../../components/ui/logo.png'

const ImageButton: React.FC = () => {
    return (
        <Link href="/">

                <Image src={logo} alt="Navigate Home" width={100} height={100} />
        </Link>
    );
}

export default ImageButton;
