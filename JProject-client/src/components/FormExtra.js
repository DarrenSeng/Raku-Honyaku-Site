export default function FormExtra({handleChange, loginState}){
    return(
        <div className="flex items-center justify-between ">
        <div className="flex items-center">
        </div>

        <div className="text-sm">
          <a href="password-reset" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>
      </div>

    )
}