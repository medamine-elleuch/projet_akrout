import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker"; // Import the DatePicker component from react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import the default styles for the DatePicker
import { registerLocale, setLocale } from "react-datepicker"; // Import locale registration and setting
import fr from "date-fns/locale/fr"; // Import the French locale

// Register the French locale with react-datepicker
registerLocale("fr", fr);
const Modal = ({ toggleModal, selectedArticle }) => {

    // État pour les données du formulaire
    const [formData, setFormData] = useState({
        name: '',
        depot: '',
        date: '',
        quantite: 0,
    });

    // État pour la date sélectionnée
    const [selectedDate, setSelectedDate] = useState(null);

    // Mise à jour de formData et selectedDate lorsque selectedArticle change
    useEffect(() => {
        if (selectedArticle) {
            console.log('selectedArticle.date:', selectedArticle.date);

            // Mettre à jour les données du formulaire avec les informations de l'article sélectionné            
            setFormData({
                name: selectedArticle.name,
                depot: selectedArticle.depot,
                date: selectedArticle.date,
                quantite: selectedArticle.quantite,
            });

            // Définir directement selectedDate à partir de selectedArticle.date
            setSelectedDate(new Date(selectedArticle.date)); // Convert to Date object
        }
    }, [selectedArticle]);

    // Log de selectedDate à chaque changement
    useEffect(() => {
        console.log('selectedDate:', selectedDate);
    }, [selectedDate]);

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value, // Mise à jour des données du formulaire
        }));
    };


    // Fonction pour soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedArticle) {
            // Logique pour la mise à jour d'un article existant
            console.log('Updating article', formData);
        } else {
            // Logique pour ajouter un nouvel article
            console.log('Adding new article', formData);
        }
        toggleModal(); // Fermer le modal après la soumission
    };

    const formatFrenchDate = (date) => {
        if (!date) return "";
        const options = { day: "2-digit", month: "long", year: "numeric" };
        return new Intl.DateTimeFormat("fr-FR", options).format(date);
    };

    return (
        <>
            {/* Main modal */}
            <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden md:inset-0">
                <div className="relative p-4 w-full max-w-md max-h-full">

                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {selectedArticle ? 'Modifier un Article' : 'Ajouter un Nouveau Article'}
                            </h3>
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Modal body */}
                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">

                                {/* Nom */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                {/* Date Peremption */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="date"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Date Peremption
                                    </label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => {
                                            setSelectedDate(date);
                                            setFormData(prevState => ({
                                                ...prevState,
                                                date: date,
                                            }));
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        locale="fr" // Set the locale to French
                                        dateFormat="dd MMMM yyyy" // Set the date format
                                    />
                                </div>

                                {/* Quantite */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="quantite"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Quantite
                                    </label>
                                    <input
                                        type="number"
                                        name="quantite"
                                        id="quantite"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={formData.quantite}
                                        onChange={handleInputChange}
                                        required
                                        min={0}
                                    />
                                </div>

                                {/* Depot */}
                                <div className="col-span-2 sm:col-span-1">
                                    <label
                                        htmlFor="depot"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Depot
                                    </label>
                                    <select
                                        id="depot"
                                        name="depot"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        value={formData.depot}
                                        onChange={handleInputChange}
                                    >
                                        <option value="BLOC CENTRAL">BLOC CENTRAL</option>
                                        <option value="URGENCE">URGENCE</option>
                                    </select>
                                </div>
                            </div>
                            <div className="border-b rounded-t dark:border-gray-600"></div>
                            <div className="pt-[15px] flex justify-end" style={{ paddingTop: '15px' }}>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {selectedArticle ? 'Modifier' : 'Ajouter'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
