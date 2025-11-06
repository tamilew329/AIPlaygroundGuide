import { useState, useEffect } from 'react'
import './App.css'

interface BuildItem {
  id: string
  name: string
  status: 'pending' | 'building' | 'completed' | 'failed'
  progress: number
}

function App() {
  const [builds, setBuilds] = useState<BuildItem[]>([
    { id: '1', name: 'Project Alpha', status: 'pending', progress: 0 },
    { id: '2', name: 'Project Beta', status: 'pending', progress: 0 },
    { id: '3', name: 'Project Gamma', status: 'pending', progress: 0 },
  ])

  useEffect(() => {
    // Simulate starting builds
    const interval = setInterval(() => {
      setBuilds(prevBuilds => {
        return prevBuilds.map(build => {
          if (build.status === 'pending') {
            // Randomly start a pending build
            if (Math.random() > 0.7) {
              return { ...build, status: 'building', progress: 0 }
            }
          } else if (build.status === 'building') {
            // Increment progress
            const newProgress = Math.min(build.progress + Math.random() * 15, 100)
            if (newProgress >= 100) {
              return { ...build, status: 'completed', progress: 100 }
            }
            return { ...build, progress: newProgress }
          }
          return build
        })
      })
    }, 500) // Update every 500ms

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981'
      case 'building':
        return '#3b82f6'
      case 'failed':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'building':
        return 'Building'
      case 'failed':
        return 'Failed'
      default:
        return 'Pending'
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Build Progress Interface</h1>
        <div className="table-wrapper">
          <table className="build-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Status</th>
                <th className="progress-column">Build Progress</th>
              </tr>
            </thead>
            <tbody>
              {builds.map(build => (
                <tr key={build.id}>
                  <td>{build.id}</td>
                  <td>{build.name}</td>
                  <td>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(build.status) }}
                    >
                      {getStatusText(build.status)}
                    </span>
                  </td>
                  <td className="progress-column">
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${build.progress}%`,
                          backgroundColor: getStatusColor(build.status)
                        }}
                      />
                      <span className="progress-text">
                        {build.status === 'building' 
                          ? `${Math.round(build.progress)}%` 
                          : build.status === 'completed' 
                          ? '100%' 
                          : '0%'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
