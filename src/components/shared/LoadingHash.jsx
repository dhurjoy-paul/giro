// npm install --save react-spinners

import { HashLoader } from 'react-spinners'

const LoadingHash = ({ color = '#36D7B7', msg = 'Loading, please wait...' }) => {
  return (
    <div className="bg-transparent flex items-center justify-center h-screen -mt-20 sm:mt-0">
      <div className="flex flex-col items-center">
        <HashLoader color={color} size={100} speedMultiplier={1.2} />
        <p className="mt-6 text-lg font-semibold text-text">{msg}</p>
      </div>
    </div>
  )
}

export default LoadingHash
