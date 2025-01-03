import React, { useState } from "react";
import Modal from "./Modal";
import './index.css';

// Composant principal pour afficher la liste des articles en stock
const Table = () => {

    // État initial pour les articles
    const [articles, setArticles] = useState([
        {
            id: 1,
            name: "DOLIPRANE 1000 mg",
            depot: "BLOC CENTRAL",
            date: new Date(2024, 11, 29), // Formatted current date
            quantite: 4,
        },
        {
            id: 2,
            name: "DOLVEN 400 mg",
            depot: "URGENCE",
            date: new Date(2024, 11, 30), // Formatted current date
            quantite: 2,
        },
    ]);

    // État pour la recherche dans la liste
    const [searchText, setSearchText] = useState("");

    // Filtrer les articles selon le texte saisi dans la recherche
    const filteredArticles = articles.filter(article =>
        article.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Fonction pour mettre à jour la quantité d'un article
    const updateQuantity = (id, change) => {
        setArticles(prevArticles =>
            prevArticles.map(article =>
                article.id === id
                    ? { ...article, quantite: Math.max(article.quantite + change, 0) }
                    : article
            )
        );
    };

    // Fonction pour supprimer un article
    const deleteArticle = (id) => {
        setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
    };

    // État pour gérer l'ouverture/fermeture du modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // État pour l'article sélectionné (pour modifier)
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Ouvrir le modal pour ajouter un nouvel article
    const handleOpenModal = () => {
        setSelectedArticle(null);  // Réinitialiser l'article sélectionné
        toggleModal();
    };

    // Basculer l'état du modal
    const toggleModal = (article = null) => {
        setSelectedArticle(article);
        setIsModalOpen(!isModalOpen);
    };

    // Fonction pour formater la date au format français
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="flex justify-center mt-8">
            <div className="w-[70%]">
                {/* En-tête avec le titre, la barre de recherche et le bouton Ajouter */}
                <div className="flex items-center justify-between pb-4 gap-4 w-full">
                    {/* Titre */}
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Liste de stock
                    </h1>

                    {/* Barre de recherche */}
                    <div className="relative flex-1 max-w-[700px] mx-4">
                        <label htmlFor="table-search" className="sr-only">
                            Search
                        </label>
                        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Rechercher un Article"
                        />
                    </div>

                    {/* Bouton pour ajouter un nouvel article */}
                    <div>
                        <button
                            onClick={handleOpenModal}
                            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-blue-500 text-white"
                            type="button"
                        >
                            Ajouter un Article
                        </button>
                    </div>
                </div>

                {/* Tableau des articles */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Article</th>
                                <th scope="col" className="px-6 py-3 text-center">Quantite</th>
                                <th scope="col" className="px-6 py-3 text-center">Depot</th>
                                <th scope="col" className="px-6 py-3 text-center">Date Peremption</th>
                                <th scope="col" className="px-6 py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredArticles.map(article => (
                                <tr
                                    key={article.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    {/* Image */}
                                    {/* <td className="p-4">
                                        <img
                                            src={article.image}
                                            className="w-16 md:w-32 max-w-full max-h-full"
                                            alt={article.name}
                                        />
                                    </td> */}
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {article.name}
                                    </td>

                                    {/* Quantite */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center items-center">
                                            {/* Contrôles pour diminuer la quantité */}
                                            <button
                                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                                onClick={() => updateQuantity(article.id, -1)}
                                            >
                                                <span className="sr-only">Decrease Quantity</span>
                                                <svg
                                                    className="w-3 h-3"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 2"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M1 1h16"
                                                    />
                                                </svg>
                                            </button>

                                            {/* Affichage de la quantité */}
                                            <div key={article.id} className="flex justify-center items-center">
                                                <input
                                                    type="number"
                                                    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={article.quantite}
                                                    readOnly
                                                />
                                            </div>

                                            {/* Contrôles pour ajouter la quantité */}
                                            <button
                                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button"
                                                onClick={() => updateQuantity(article.id, +1)}
                                            >
                                                <span className="sr-only">Increase Quantity</span>
                                                <svg
                                                    className="w-3 h-3"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 1v16M1 9h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                    {/* Depot */}
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center justify-center">
                                        {article.depot}
                                    </td>

                                    {/* Date Peremption */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center">
                                            <div key={article.id} className="flex justify-center items-center">
                                                <input
                                                    type="text"
                                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    defaultValue={formatDate(article.date)}
                                                    style={{ width: '8.7rem' }}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Action */}
                                    <td className="flex px-6 py-4 text-center  justify-center">

                                        <div className="flex  justify-between" style={{ width: '6.8rem' }} >
                                            <button
                                                className="font-medium text-orange-600 dark:text-orange-500 hover:underline"
                                                onClick={() => toggleModal(article)}>
                                                Modifier
                                            </button>

                                            <div className="w-[4px]"></div>

                                            <button
                                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                onClick={() => deleteArticle(article.id)}>
                                                Effacer
                                            </button>
                                        </div>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Component */}
            {isModalOpen && <Modal toggleModal={toggleModal} selectedArticle={selectedArticle} />}

        </div>
    );
};

export default Table;