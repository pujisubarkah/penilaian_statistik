import React from 'react';

const Footer = () => {
    return (
        <div className="mt-8">
            <img src="/lanri.png" alt="Logo LANRI" className="inline-block mr-4" />
            <div className="inline-block align-top">
                <h2 className="font-bold">Lembaga Administrasi Negara</h2>
                <p>Pusat Data dan Sistem Informasi</p>
                <p>Jl. Veteran No 10 Jakarta 11010, Indonesia</p>
                <p><i className="fas fa-phone"></i> (62-21) xxxxxx</p>
                <p><i className="fas fa-envelope"></i> pusdatin@lan.go.id</p>
            </div>
        </div>
    );
};

export default Footer;
