import Image from 'next/image';
import styles from './page.module.css';

export default async function Home() {
    const res = await fetch('http://localhost:3000/api', { cache: 'no-store' }); // TODO: remove cache
    const data = await res.json();

    return (
        <>
            <div className="text-primary">Tailwind</div>
            <div className="text-secondary">Tailwind</div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
}
