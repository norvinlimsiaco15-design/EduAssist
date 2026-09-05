export default function ComingSoon({ title, description }) {
  return (
    <div className="card text-center py-16">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-500 mt-2 max-w-md mx-auto">
        {description || 'This feature will be available in an upcoming phase.'}
      </p>
    </div>
  )
}
