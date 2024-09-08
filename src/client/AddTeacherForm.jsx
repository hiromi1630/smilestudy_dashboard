import { useForm } from 'react-hook-form'

const AddTeacherForm = () => {

  // デフォルトの色(ランダム)を生成
  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // react-hook-formを使う準備
  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    criteriaMode: "all",     // 発生した全てのエラーを受け取る
    defaultValues: {         // 初回レンダリング時のフォームのデフォルト値
      family_name: '',
      given_name: '',
      color: generateRandomColor()
    }
  });

  // 登録ボタンを押したときの処理
  const onSubmit = data => {
    google.script.run.withSuccessHandler(function(){alert("登録が完了しました");}).withFailureHandler(function(){alert("登録に失敗しました。もう一度行ってください");}).addTeacher(data);
    reset();
    reset({ color: generateRandomColor() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className = 'card md:w-96 w-full h-fit bg-base-100 shadow-xl relative ${className} rounded border border-red-300 m-8 p-8'>
      <p className='text-2xl text-black font-bold text-center mb-5'>講師登録フォーム</p>
      <div>
        <input
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          placeholder='苗字'
          {...register("family_name",{
            required: "苗字を入力してください"
          })}
          type="text"
        />
        {errors.family_name && <p style={{ color: "red" }}>{errors.family_name.message}</p>}
      </div>
      <div>
        <input 
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          placeholder='名前'
          {...register("given_name",{
            required: "名前を入力してください"
          })}
          type="text"
        />
        {errors.given_name && <p style={{ color: "red" }}>{errors.given_name.message}</p>}
      </div>
      <div>
        <input
          className="w-full py-2 border-b focus:outline-none focus:border-b-2 focus:border-indigo-500 placeholder-gray-500 placeholder-opacity-50"
          placeholder='色'
          {...register("color",{
            required: "色を入力してください",
            pattern: {
              value: /^#([0-9a-fA-F]{6})$/,
              message: "カラーコードの形式が不正です"
            }
          })}
          type="text"
        />
        {errors.color && <p style={{ color: "red" }}>{errors.color.message}</p>}
      </div>
      <button 
        type="submit"
        className="py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-3xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white">
        登録
      </button>
      {isSub}
    </form>
  )
}

export default AddTeacherForm