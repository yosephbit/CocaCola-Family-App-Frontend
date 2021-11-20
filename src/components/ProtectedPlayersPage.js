import React from 'react'
import { ProtectedRoute } from '.'
import { PlayersPage } from '../pages'

function ProtectedPlayersPage() {
    return (
        <ProtectedRoute>
            <PlayersPage />
        </ProtectedRoute>
    )
}

export default ProtectedPlayersPage
