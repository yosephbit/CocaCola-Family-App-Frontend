import React from 'react'
import { ScorePage } from '../pages'
import { ProtectedRoute } from '.'

function ProtectedScorePage() {
    return (
        <ProtectedRoute>
            <ScorePage />
        </ProtectedRoute>
    )
}

export default ProtectedScorePage
