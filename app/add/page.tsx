"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddProduct = () => {
  const { data: session, status } = useSession();

  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);

  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append("upload_preset", "restaurant");

    const res = await fetch("здесь должен быть работающий в России api", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    });
    const resData = await res.json();
    return resData.url;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();

      router.push(`product/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        action=""
        className="shadow-lg flex flex-wrap gap-4 p-8"
        onSubmit={handleSubmit}
      >
        <h1>Add new product</h1>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Image</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="file"
            onChange={handleChangeImage}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Title</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="title"
          />
        </div>
        <div>
          <label htmlFor="">Desc</label>
          <textarea
            className="ring-1 ring-red-200 p-2 rounded-sm"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Price</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="number"
            name="price"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Category</label>
          <input
            onChange={handleChange}
            className="ring-1 ring-red-200 p-2 rounded-sm"
            type="text"
            name="catSlug"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Options</label>
          <div>
            <input
              onChange={handleOption}
              className="ring-1 ring-red-200 p-2 rounded-sm"
              type="text"
              placeholder="title"
              name="title"
            />
            <input
              onChange={handleOption}
              className="ring-1 ring-red-200 p-2 rounded-sm"
              type="number"
              placeholder="additionalPrice"
              name="additionalPrice"
            />
          </div>
          <button
            className="w-52 bg-red-500 text-white p-2"
            onClick={() => setOptions((prev) => [...prev, option])}
          >
            Add Option
          </button>
        </div>
        {options.map((item) => (
          <div
            className="ring-1 p-2 ring-red-500 rounded-md cursor-pointer"
            key={item.title}
            onClick={() =>
              setOptions(options.filter((opt) => opt.title !== item.title))
            }
          >
            <span>{item.title}</span>
            <span>${item.additionalPrice}</span>
          </div>
        ))}
        <button type="submit" className="p-2 w-full bg-red-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
