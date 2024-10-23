import Header from "../components/Header"
import PasswordResetLink from "../components/PasswordResetLink"

export default function PasswordResetLinkPage(){
    return(
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 flex-column justify-center">
             <Header
                heading="Reset your password"
                paragraph="Already have an account? "
                linkName="Log In"
                linkUrl="/login"
                />
            <PasswordResetLink/>
            </div>
            
            </div>
    )
}