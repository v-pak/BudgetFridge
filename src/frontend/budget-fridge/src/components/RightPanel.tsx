import { FridgeItemsList } from './FridgeItemsList';

export function RightPanel() {
    const placeholderItems = [
        { name: 'Chicken thighs', qty: '500g' },
        { name: 'Jasmine rice', qty: '2 cups' },
        { name: 'Broccoli', qty: '1 head' },
    ];

    return (
        <div className="panel-right">
            <div className="fridge-header">
                Your Fridge
                <span className="fridge-header-line" />
            </div>
            <FridgeItemsList items={placeholderItems} />
        </div>
    );
}