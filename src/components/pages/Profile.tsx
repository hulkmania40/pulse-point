import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle } from 'lucide-react'
import type { User } from '@/common/schema'
import { useAuth } from '@/hooks/useAuth'
import { _get } from '@/utils/crudService'

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

const VerificationBadge = ({
  verified,
  type,
}: {
  verified: boolean
  type: 'email' | 'mobile'
}) => (
  <Badge variant={verified ? 'default' : 'destructive'} className="flex items-center gap-1">
    {verified ? (
      <>
        <CheckCircle className="w-4 h-4" /> {type} verified
      </>
    ) : (
      <>
        <XCircle className="w-4 h-4" /> {type} not verified
      </>
    )}
  </Badge>
)

const Profile = () => {
  const { user } = useAuth()
  const [userDetails, setUserDetails] = useState<User | null>(null)

  useEffect(() => {
    if (user?.id) {
      fetchUserDetails(user.id)
    }
  }, [user?.id])

  const fetchUserDetails = async (user_id: string) => {
    const res:any = await _get(`/user_details/${user_id}`)
    if (res) {
      setUserDetails(res)
    }
  }

  if (!userDetails) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-muted-foreground">
        Loading profile...
      </div>
    )
  }

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Username:</span>
          <span>{userDetails.username}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{userDetails.email}</span>
        </div>
        <VerificationBadge verified={userDetails.email_verified} type="email" />

        <div className="flex justify-between">
          <span className="font-medium">Mobile:</span>
          <span>{userDetails.mobile}</span>
        </div>
        <VerificationBadge verified={userDetails.mobile_verified} type="mobile" />

        <div className="flex justify-between">
          <span className="font-medium">Role:</span>
          <span className="capitalize">{userDetails.role}</span>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <span className="font-medium">Created At:</span>
          <span>{formatDate(userDetails.created_at)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Updated At:</span>
          <span>{formatDate(userDetails.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default Profile
