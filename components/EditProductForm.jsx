"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

export default function EditProductForm({ id, name, image, price, category }) {
    const [newName, setNewName] = useState(name);
    const [newImage, setNewImage] = useState(image);
    const [newPrice, setNewPrice] = useState(price);
    const [newCategory, setNewCategory] = useState(category);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ newName, newImage, newPrice, newCategory}),
            })

            if(!res.ok) {
                throw new Error("Failed to update Product");
            }


            router.push("/")
            router.refresh();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="font-bold py-10 text-2xl">Update Product {id}</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                <input 
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                className="input input-bordered input-accent w-full max-w-xs" type="text" />

                <input 
                onChange={(e) => setNewImage(e.target.value)}
                value={newImage}
                className="input input-bordered input-accent w-full max-w-xs" type="text" />

                <input 
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
                className="input input-bordered input-accent w-full max-w-xs" type="text" />

                <input 
                onChange={(e) => setNewCategory(e.target.value)}
                value={newCategory}
                className="input input-bordered input-accent w-full max-w-xs" type="text" />

                <button className="btn btn-primary w-full max-w-xs">Update Product</button>

            </form>
        </>
    )
}