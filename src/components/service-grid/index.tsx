import ServiceList from '@/data/services.json';
import DynamicFAIcon from '../icons';

const ServiceGrid = ({ className }: { className: string }) => {
    return (
        <div className="row">
            {ServiceList.map((val, i) => (
                <div className={className} key={i}>
                    <a href={val.link ? val.link : "#service"} target={val.openNewTab ? '_blank' : ''}>
                        <div className="service service__style--2">
                            <div className="icon" style={{ minHeight: '47px' }}>
                                {val.icon && <DynamicFAIcon icon={val.icon} />}
                            </div>
                            <div className="content">
                                <h3 className="title">{val.title}</h3>
                                <p>{val.description}</p>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    )
}

export default ServiceGrid;
