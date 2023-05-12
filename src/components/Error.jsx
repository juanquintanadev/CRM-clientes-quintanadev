/* eslint-disable react/prop-types */

const Error = ({children}) => {
  return (
    <div className="bg-red-500 text-white font-bold uppercase text-center my-4 p-3">
        {children}
    </div>
  )
}

export default Error