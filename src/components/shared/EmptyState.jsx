const EmptyState = ({ icon: Icon, label }) => {
  return (
    <div className="w-fit mx-auto bg-text/70 border border-text text-background mt-18 rounded-2xl py-6">
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-bricolage-grotesque flex items-center justify-center gap-4 px-8">
        <span className="block "><Icon /></span>
        <span className=''>{label}</span>
      </p>
    </div>
  )
}
export default EmptyState