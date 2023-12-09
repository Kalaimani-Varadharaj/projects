import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../App.css"; // Import your CSS file
import { Link } from 'react-router-dom';

export default function Cards() {
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
            name: "Health Insurance",
            imageUrl: "https://images.indianexpress.com/2023/06/Dil-LEAD.jpg?resize=720,405?w=640",
            description: "Health insurance is a financial arrangement that provides individuals and families with coverage for medical expenses. It serves as a protective shield against the potentially high costs of healthcare, offering peace of mind and access to essential medical services."
        },
        {
            name: "Short-Term Health Insurance",
            imageUrl: "https://images.indianexpress.com/2022/10/FE-Tata-Lead.jpg?w=414",
            description: "Short-term health insurance is a temporary solution for individuals seeking coverage for unexpected medical expenses over a limited period. It offers a short-duration safety net, typically lasting a few months to a year, and can be helpful during transitional phases like job changes or waiting for long-term health insurance to begin."
        },
        {
            name: "Life Insurance",
            imageUrl: "https://www.financialexpress.com/wp-content/uploads/2023/07/life-insurance2a.jpg",
            description: "Life insurance is a long-term financial protection tool that provides peace of mind by ensuring that your loved ones are financially secure in the event of your death. It pays out a death benefit to your chosen beneficiaries, helping them cover expenses like funeral costs, outstanding debts, and maintaining their quality of life."
        },
        {
            name: "Motor Insurance",
            imageUrl: "https://images.indianexpress.com/2022/09/Tata-AIG-Lead.jpg",
            description: "Motor insurance, also known as vehicle insurance or auto insurance, is a type of insurance that provides coverage for various types of vehicles, including cars, motorcycles, trucks, and other motorized vehicles. Motor insurance is a legal requirement in many countries and is essential for protecting both the vehicle owner and others on the road."
        },
        {
            name: "Home Insurance",
            imageUrl: "https://images.newindianexpress.com/uploads/user/imagelibrary/2018/7/2/w600X300/Building_you.jpg?w=400&dpr=2.6",
            description: "Home insurance policy provides coverage for potential risks like fires, theft, natural disasters, and liability claims, ensuring that homeowners can repair or rebuild their property and replace personal belongings in the event of a covered loss. With options for additional living expense coverage and liability protection, home insurance offers comprehensive financial security, making it an indispensable component of responsible homeownership."
        },
        {
            name: "Disability Insurance",
            imageUrl: "https://images.indianexpress.com/2019/09/hackathon_759.jpg?w=389",
            description: "Disability insurance is a vital financial safety net that provides income replacement for individuals who are unable to work due to a disability or illness. This insurance coverage ensures that policyholders continue to receive a portion of their salary or income when they are unable to perform their job duties."
        },
        {
            name: "Travel Insurance",
            imageUrl: "https://images.indianexpress.com/2022/11/lead-10-1.jpg",
            description: "Travel Insurance offers protection against unforeseen events such as trip cancellations, travel delays, medical emergencies, lost luggage, and more. With travel insurance, travelers can enjoy peace of mind, knowing that they have financial assistance and support to address unexpected challenges that may disrupt their travel plans."
        }
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
                            <TruncateDescription description={insurance.description} limit={100} />
                            <Link to="/content">
                                <button >Learn More</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
