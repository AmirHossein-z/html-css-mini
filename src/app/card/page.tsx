import Image from "next/image";
import "./_scss/style.scss";
import eiffelImg from "../../../public/images/eiffel-tower-3349075_1920.jpg";
import Link from "next/link";

export default function Cards() {
    return (
        <>
            <aside className="menu">
                <Link href="#card1">card1</Link>
                <Link href="#card2">card2</Link>
                <Link href="#card3">card3</Link>
                <Link href="#card4">card4</Link>
                <Link href="#card5">card5</Link>
                <Link href="#card6">card6</Link>
                <Link href="#card7">card7</Link>
                <Link href="#card8">card8</Link>
                <Link href="#card9">card9</Link>
                <Link href="#card10">card10</Link>
                <Link href="#card11">card11</Link>
            </aside>

            <h1 className="h1-top">design some cards with html and scss</h1>

            {/* <!-- first card --> */}
            <div className="card-wrapper" id="card1">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card1-${index}`}>
                        <div className="card-overlay-1">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                        <div className="card-overlay-1-btn">
                            <button>button</button>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-1"
                        />
                    </div>
                ))}
            </div>
            {/* <!-- first card --> */}

            {/* <!-- second card --> */}
            <div className="card-wrapper" id="card2">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card2-${index}`}>
                        <div className="card-overlay-2">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-2-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-2"
                        />
                    </div>
                ))}
            </div>
            {/* <!-- second card --> */}

            {/* <!-- third card --> */}
            <div className="card-wrapper" id="card3">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card3-${index}`}>
                        <div className="card-overlay-3">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-3-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-3"
                        />
                    </div>
                ))}
            </div>
            {/* <!-- third card --> */}

            {/* <!-- forth card --> */}
            <div className="card-wrapper" id="card4">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card4-${index}`}>
                        <div className="card-overlay-4">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-4-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-4"
                        />
                    </div>
                ))}
            </div>
            {/* <!-- forth card --> */}

            {/* <!-- fifth card --> */}
            <div className="card-wrapper" id="card5">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card5-${index}`}>
                        <div className="card-overlay-5">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-5-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-5"
                        />
                    </div>
                ))}
            </div>
            {/* <!-- sixth card --> */}
            <div className="card-wrapper" id="card6">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card6-${index}`}>
                        <div className="card-overlay-6">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-6-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-6"
                        />
                    </div>
                ))}
            </div>

            {/* <!-- seventh card  --> */}
            <div className="card-wrapper" id="card7">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card7-${index}`}>
                        <div className="card-overlay-7">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-7-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-7"
                        />
                    </div>
                ))}
            </div>

            {/* <!-- eighth card --> */}
            <div className="card-wrapper" id="card8">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card8-${index}`}>
                        <div className="card-overlay-8">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-8-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-8"
                        />
                    </div>
                ))}
            </div>

            {/* <!-- ninth card --> */}
            <div className="card-wrapper" id="card9">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card9-${index}`}>
                        <div className="card-overlay-9">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-9-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-9"
                        />
                    </div>
                ))}
            </div>

            {/* <!-- tenth card --> */}
            <div className="card-wrapper" id="card10">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card10-${index}`}>
                        <div className="card-overlay-10">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-10-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-10"
                        />
                    </div>
                ))}
            </div>

            {/* <!-- eleventh card --> */}
            <div className="card-wrapper" id="card11">
                {Array.from({ length: 6 }, (_, index) => (
                    <div className="card" key={`card11-${index}`}>
                        <div className="card-overlay-11">
                            <h1>heading</h1>
                            <p>Lorem ipsum dolor sit amet.</p>
                            <div className="card-overlay-11-btn">
                                <button>button</button>
                            </div>
                        </div>
                        <Image
                            src={eiffelImg}
                            alt="eiffel"
                            className="card-img-11"
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
