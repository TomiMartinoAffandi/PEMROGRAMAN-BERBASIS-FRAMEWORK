import { useRouter } from "next/router";

const HalamanBlog = () => {
    const {query} = useRouter();
    return (
        <div>
            <h1>Halaman blog</h1>
            <p>Slug : {query.slug}</p>

        </div>
    );
};

export default HalamanBlog;