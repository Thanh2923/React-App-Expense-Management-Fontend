
export default function ConfirmDelete({isOpen,closeModal,handleDelete}) {

  return (
    <div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold ">Bạn có chắc muốn xóa không ?</h3>
            <div className="mt-10 flex justify-end space-x-4">
              <button 
                onClick={closeModal} 
                className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400"
              >
                Hủy
              </button>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
