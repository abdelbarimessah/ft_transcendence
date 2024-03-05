import Image from "next/image";
import Link from "next/link";

// LoginModal.tsx
interface LoginModalProps {
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-sm text-color-10">
      <div
        className="absolute w-full h-full bg-black opacity-30"
        onClick={closeModal}
      ></div>
      <div className="z-50 w-[350px] h-fit p-4 flex flex-col items-center justify-between rounded-lg shadow-lg bg-color-11 border-2 border-color-10">
        <h1 className="text-2xl pb-4 ">Sign in</h1>
        <div className="py-4 w-full h-full flex items-center justify-evenly">
          <Link href={`${backendUrl}/auth/42`}>
            <div className="rounded-full bg-white h-[60px] w-[60px] flex items-center justify-center hover:scale-110 duration-200">
              <Image
                src="/assets/intraLogo.svg"
                alt="42 Intra Logo"
                height={45}
                width={45}
                priority={true}
              />
            </div>
          </Link>
          <h1>Or</h1>
          <div className="rounded-full bg-white h-[60px] w-[60px] flex items-center justify-center hover:scale-110 duration-200">
            <Link href={`${backendUrl}/auth/google`}>
              <Image
                src="/assets/googleLogo.svg"
                alt="Google Logo"
                height={45}
                width={45}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
