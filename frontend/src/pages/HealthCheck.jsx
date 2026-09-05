import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import api from '../services/api'

export default function HealthCheck() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/health')
      .then((res) => setStatus(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <Link to="/" className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="card">
          <h1 className="text-xl font-bold mb-4">API Health Check</h1>

          {loading && (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              Checking connection...
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 text-red-600">
              <XCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Connection Failed</p>
                <p className="text-sm text-red-500 mt-1">{error}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Make sure the Flask backend is running on port 5000 and MySQL is configured.
                </p>
              </div>
            </div>
          )}

          {status && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {status.database?.connected ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className="font-medium">{status.message}</span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">API Status</span>
                  <span className="font-medium capitalize">{status.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Database</span>
                  <span className={status.database?.connected ? 'text-green-600' : 'text-red-600'}>
                    {status.database?.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <p className="text-gray-400 text-xs pt-1">{status.database?.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
