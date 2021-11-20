import React from 'react'
import { ProtectedRoute } from '.'
import { SocialLinkPage } from '../pages'

function ProtectedLinksPage() {
    return (
        <ProtectedRoute>
            <SocialLinkPage />
        </ProtectedRoute>
    )
}

export default ProtectedLinksPage
