"use client"

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

/**
 * Reads the `session_id` query param added by Stripe after a successful checkout.
 * Calls /api/stripe/verify-session to update the DB, then hard-reloads
 * to remove the param from the URL and reflect the new plan in the sidebar.
 */
export function CheckoutSuccess() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const didRun = useRef(false);

    useEffect(() => {
        if (!sessionId || didRun.current) return;
        didRun.current = true;

        axios
            .get(`/api/stripe/verify-session?sessionId=${sessionId}`)
            .then(() => {
                // Hard reload to clear query params and re-fetch all server data
                window.location.replace("/dashboard");
            })
            .catch((err) => {
                console.error("[CheckoutSuccess]", err);
                // Navigate to clean dashboard even on error
                window.location.replace("/dashboard");
            });
    }, [sessionId]);

    return null;
}
