import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ smallHeight, color = '#36D7B7' }) => {
  return (
    <div className={`
        flex flex-col justify-center items-center
        ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
       `}
    >
      <ScaleLoader size={100} speedMultiplier={1.2} color={color} />
    </div>
  )
}

export default LoadingSpinner
