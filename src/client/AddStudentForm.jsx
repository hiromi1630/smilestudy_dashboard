import { useForm } from 'react-hook-form'

const AddStudentForm = () => {

  // react-hook-formを使う準備
  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    criteriaMode: "all",     // 発生した全てのエラーを受け取る
    defaultValues: {         // 初回レンダリング時のフォームのデフォルト値
      name: '',
      grade: '',
      comiru: ''
    }
  });

  // 登録ボタンを押したときの処理
  const onSubmit = data => {
    google.script.run.withSuccessHandler(function(){alert("登録が完了しました");}).withFailureHandler(function(){alert("登録に失敗しました。もう一度行ってください");}).addStudent(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className = 'card md:w-96 w-full h-fit bg-base-100 shadow-xl relative ${className} rounded border border-blue-300 m-8 p-8'>
      <p className='text-2xl text-black font-bold text-center mb-5'>生徒登録フォーム</p>
      <div>
        <input
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          placeholder='名前'
          {...register("name",{
            required: "名前を入力してください"
          })}
          type="text"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>
      <div>
				<label>学年</label>
        <select
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          {...register("grade",{
            required: "学年を入力してください"
          })}
        >
					<option value='1'>小1</option>
					<option value='2'>小2</option>
					<option value='3'>小3</option>
					<option value='4'>小4</option>
					<option value='5'>小5</option>
					<option value='6'>小6</option>
					<option value='7'>中1</option>
					<option value='8'>中2</option>
					<option value='9'>中3</option>
					<option value='10'>高1</option>
					<option value='11'>高2</option>
					<option value='12'>高3</option>
					<option value='13'>既卒</option>
				</select>
        {errors.grade && <p style={{ color: "red" }}>{errors.grade.message}</p>}
      </div>
			<div>
				<input
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          placeholder='Comiru ID'
          {...register("comiru",{
            required: "ComiruIDを入力してください",
						pattern: {
							value: /\d+/,
							message: "IDは半角数字で入力してください"
						}
          })}
          type="text"
        />
        {errors.comiru && <p style={{ color: "red" }}>{errors.comiru.message}</p>}
			</div>
      <button 
        type="submit"
        className="py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-3xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white">
        登録
			</button>
    </form>
  )
}

export default AddStudentForm