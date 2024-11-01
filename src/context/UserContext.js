import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assuming you're using Supabase for authentication

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the session from Supabase
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user || null);
            setLoading(false);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    const signUp = async (email, password) => {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return user;
    };

    const logIn = async (email, password) => {
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return user;
    };

    const logOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signUp, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
