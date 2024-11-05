// Sidebar.js
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function Sidebar({ isOpen, setCurrentPage }) {
    const [questions, setQuestions] = useState([]);
    const handleQuestionClick = (questionId) => {
        setCurrentPage(questionId);
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data: userData, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error('Error fetching user:', userError);
                return;
            }

            const userId = userData?.user?.id;

            if (!userId) {
                console.warn('User ID not found');
                return;
            }

            console.log('User ID:', userId);

            const { data, error } = await supabase
                .schema('simbatik')
                .from('indikator')
                .select(`
                    id,
                    indikator_nama,
                    penilaian2:penilaian2(indikator_id, level_id, file_url, penjelasan)
                `)
                .eq('penilaian2.user_id', userId)
                .order('id', { ascending: true });

            if (error) {
                console.error('Error fetching questions:', error);
                return;
            }

            const formattedData = data.map(question => ({
                indikator_id: question.id,
                text: question.indikator_nama,
                completed: question.penilaian2.length > 0 
                && question.penilaian2[0].file_url !== null && question.penilaian2[0].file_url !== '' 
                && question.penilaian2[0].penjelasan !== null && question.penilaian2[0].penjelasan !== '',
            }));

            setQuestions(formattedData);
        };

        fetchQuestions();
    }, []);

    if (!isOpen) return null;

    return (
        <div className={`fixed left-0 top-0 w-64 h-full bg-white shadow-lg p-4 overflow-y-auto z-50 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <h2 className="text-lg font-semibold mb-4">Ringkasan Pertanyaan</h2>

            <ul className="space-y-2">
                {questions.map((question) => (
                    <li key={question.id} className="flex items-center justify-between">
                        <span
                            className={`text-sm cursor-pointer ${question.completed ? 'text-teal-600' : 'text-gray-500'}`}
                            onClick={() => handleQuestionClick(question.id)}
                        >
                            {question.text}
                        </span>
                        <span className={`text-xs font-semibold ${question.completed ? 'text-green-500' : 'text-red-500'}`}>
                            {question.completed ? 'Lengkap' : 'Belum'}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
