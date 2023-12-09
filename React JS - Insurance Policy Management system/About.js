import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../App.css"; // Import your CSS file
import { Link } from 'react-router-dom';

export default function About() {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const insuranceData = [
        {
            name: "Accounting services",
            imageUrl: "https://img.freepik.com/free-vector/audit-concept-illustration_114360-6777.jpg?size=626&ext=jpg&ga=GA1.1.732744752.1694896940&semt=ais",
            description: "Discover our Account Services, your trusted partner for hassle-free insurance management. Whether you're an individual policyholder or a corporate client, we offer tailored solutions to streamline your insurance accounts. Access your policies, make updates, and receive timely reminders with ease. Our user-friendly platform ensures you stay in control of your insurance journey every step of the way."
        },
        {
            name: "Policy Consulting",
            imageUrl: "https://img.freepik.com/premium-vector/meeting-strategy-marketing-analytic_18660-1060.jpg?size=626&ext=jpg&ga=GA1.1.732744752.1694896940&semt=ais",
            description: "Introducing our Policy Consulting expertise, where insurance meets strategic guidance. Our team of seasoned professionals is here to provide you with insightful advice and personalized insurance solutions. Whether you're seeking the perfect coverage, optimizing your policy portfolio, or navigating complex insurance decisions, our consulting services are your compass in the world of insurance."
        },
        {
            name: "Online Services",
            imageUrl: "https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?w=740&t=st=1694896963~exp=1694897563~hmac=d131707039359497c8bb525538c5b03017b51969f2c3a6d11e8a947a2428cfa7",
            description: "Experience the future of insurance with our Online Services. We've harnessed the power of technology to bring insurance solutions to your fingertips. From instant policy quotes and online applications to real-time support and claims processing, our digital platform ensures you have access to insurance services whenever and wherever you need them."
        },
        {
            name: "Contact Details:",
            imageUrl: "https://img.freepik.com/premium-vector/online-support-illustration-flat-design-concept-illustration-websites-landing-pages-mobile-applications-posters-banners_108061-824.jpg?size=626&ext=jpg&ga=GA1.2.732744752.1694896940&semt=ais",
            description: "Connect with us easily through multiple channels. Have a question or need assistance? Reach out to our WhatsApp services at +123-456-7890 for quick and convenient support. For email inquiries, drop us a message at support@insure.com, and our team will respond promptly. Prefer browsing online? Visit our website for a range of online services and forms to get the help you need. We're here to make your insurance experience seamless and accessible."
        },
        
    ];

    const TruncateDescription = ({ description, limit }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        return (
            <div>
                {description && (
                    <p>
                        {isExpanded ? description : `${description.slice(0, limit)}...`}
                        {!isExpanded && (
                            <span
                                className="read-more"
                                onClick={() => setIsExpanded(true)}
                            >
                                Read More
                            </span>
                        )}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div>
        <div className="Cards">
            <Carousel responsive={responsive}>
                {insuranceData.map((insurance, index) => (
                    <div className="card text-center" key={index}>
                        <div className="card-body">
                            <div className="square-image">
                                <img
                                    className="img-fluid"
                                    src={insurance.imageUrl}
                                    alt={`Insurance Type: ${insurance.name}`}
                                />
                            </div>
                            <h4>{insurance.name}</h4>
                            <TruncateDescription description={insurance.description} limit={150} />

                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px', textDecoration: 'underline' }}>
                <Link to="/">Go back</Link>
            </div>
        </div>
    );
}
