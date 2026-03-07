export default function UpgradeModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-96">
        <h2 className="text-xl font-bold mb-4">Upgrade to Pro</h2>
        <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg mb-3">
          Pay $19/month
        </button>
        <button onClick={onClose} className="w-full">
          Cancel
        </button>
      </div>
    </div>
  );
}