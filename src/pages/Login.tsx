import { useState } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { signInWithEmailAndPassword } from 'firebase/auth'
    import { auth } from '../firebase/config'
    import { Button, Input } from '@material-tailwind/react'

    export default function Login() {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [error, setError] = useState('')
      const navigate = useNavigate()

      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
          await signInWithEmailAndPassword(auth, email, password)
          navigate('/admin')
        } catch (err) {
          setError('Invalid email or password')
        }
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Restaurant Order System
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" fullWidth>
                Sign In
              </Button>
            </form>
          </div>
        </div>
      )
    }
