import React from 'react'
import { ProtectedRoute } from '.'
import GamePlayPage from '../pages/GamePlayPage'

function ProtectedGamePlayPage() {
    return (
        <ProtectedRoute>
            <GamePlayPage />
        </ProtectedRoute>
    )
}

export default ProtectedGamePlayPage
