'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'

export default function AdminResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [initializing, setInitializing] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const handleAuthFromUrl = async () => {
      console.log('Current URL:', window.location.href)
      
      try {
        // Kiểm tra URL có chứa token không
        const hash = window.location.hash
        console.log('Hash:', hash)
        
        if (hash.includes('access_token')) {
          console.log('Found access_token in URL, setting session...')
          
          const result = await authService.setSessionFromUrl()
          console.log('Set session result:', result)
          
          if (result.error) {
            setError(`Lỗi xác thực: ${result.error}`)
          } else if (result.session && result.user) {
            setIsAuthenticated(true)
            setError('')
            console.log('Authentication successful!')
            
            // Clear URL hash để tránh lộ token
            window.history.replaceState({}, document.title, window.location.pathname)
          } else {
            setError('Không thể xác thực session')
          }
        } else {
          // Không có token trong URL, kiểm tra session hiện tại
          const sessionResult = await authService.getCurrentSession()
          if (sessionResult.session) {
            setIsAuthenticated(true)
          } else {
            setError('Link reset password không hợp lệ. Vui lòng yêu cầu reset password mới.')
          }
        }
      } catch (error) {
        console.error('Auth error:', error)
        setError('Có lỗi xảy ra khi xác thực')
      } finally {
        setInitializing(false)
      }
    }

    handleAuthFromUrl()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    setLoading(true)
    setError('')

    try {
      console.log('Updating password...')
      const result = await authService.updatePassword(password)
      console.log('Update password result:', result)

      if (result.error) {
        setError(`Lỗi cập nhật mật khẩu: ${result.error}`)
      } else {
        setSuccess('🎉 Mật khẩu đã được cập nhật thành công!')
        
        // Tự động chuyển đến trang login sau 3 giây
        setTimeout(() => {
          router.push('/admin/login')
        }, 3000)
      }
    } catch (error) {
      console.error('Update password error:', error)
      setError('Có lỗi không xác định khi cập nhật mật khẩu')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push('/admin/login')
  }

  // Loading state
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600">Đang xác thực token...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              🔐 Đặt lại mật khẩu
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Tạo mật khẩu mới cho tài khoản admin
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                  {error.includes('Link reset password không hợp lệ') && (
                    <button
                      onClick={handleBackToLogin}
                      className="mt-2 text-sm text-red-600 underline hover:text-red-500"
                    >
                      Quay lại trang đăng nhập
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-green-400">✅</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                  <p className="text-xs text-green-600 mt-1">
                    Đang chuyển đến trang đăng nhập...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reset Password Form */}
          {isAuthenticated && !success && (
            <form className="space-y-6" onSubmit={handleUpdatePassword}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu mới
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                  placeholder="Nhập lại mật khẩu mới"
                  minLength={6}
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading || !password || !confirmPassword || password !== confirmPassword}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang cập nhật...
                    </div>
                  ) : (
                    '🔄 Cập nhật mật khẩu'
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="w-full text-center py-2 px-4 text-sm text-gray-600 hover:text-gray-800 underline transition-colors"
                >
                  ← Quay lại trang đăng nhập
                </button>
              </div>
            </form>
          )}

          {/* Debug Info (chỉ hiện trong development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-100 rounded text-xs text-gray-600">
              <p><strong>Debug Info:</strong></p>
              <p>Authenticated: {isAuthenticated ? '✅' : '❌'}</p>
              <p>Has Hash: {window.location.hash ? '✅' : '❌'}</p>
              <p>Loading: {loading ? '✅' : '❌'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}