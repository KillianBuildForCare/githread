import ThemeToggle from "@/src/theme/ThemeToggle";
import LoginButton from "./auth/LoginButton";
import { getAuthSession } from "@/lib/auth";
import UserProfile from "./auth/UserProfile";

const Header = async () => {
    const session = await getAuthSession();

    return (
        <header className="border-b border-b-accent fixed top-0 bg-background w-full z-20">
            <div className="container flex items-center py-2 max-w-lg m-auto p-2 gap-1">
                <h2 className="text-2xl font-bold mr-auto">
                    Githread
                </h2>
                <ThemeToggle />
                {
                    session?.user ? (
                        <UserProfile />
                    ) : (
                        <LoginButton />
                    )
                }
            </div>
        </header>
    );
}

export default Header; 