import React from 'react'
import { ProtectedRoute } from '.'
import { CameraPage } from '../pages'

function ProtectedGamePage() {
    return (
        <ProtectedRoute>
            <CameraPage />
        </ProtectedRoute>
    )
}

export default ProtectedGamePage
