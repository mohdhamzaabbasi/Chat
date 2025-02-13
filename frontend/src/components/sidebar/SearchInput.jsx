import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaRobot } from "react-icons/fa"; // Icon for the chatbot button
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

	const handleChatbotRedirect = () => {
		window.location.href = "https://chatbotapp-2.onrender.com/"; 
	};

	return (
		<div className="flex flex-col items-center gap-2">
			<form onSubmit={handleSubmit} className="flex items-center gap-2">
				<input
					type="text"
					placeholder="Search…"
					className="input input-bordered rounded-full"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button type="submit" className="btn btn-circle bg-sky-500 text-white">
					<IoSearchSharp className="w-6 h-6 outline-none" />
				</button>
			</form>
			<button
				onClick={handleChatbotRedirect}
				className="flex items-center gap-2 px-4 py-2 mt-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
			>
				<FaRobot className="w-5 h-5" />
				
				<span>Ask ChatBot</span>
			</button>
		</div>
	);
};

export default SearchInput;
