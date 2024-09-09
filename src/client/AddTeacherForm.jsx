import { useForm } from 'react-hook-form';
import { SwatchesPicker } from 'react-color';
import { useState } from 'react';

const AddTeacherForm = () => {
  // カラーピッカのプリセット色
  const defaultColors = [
    '#b71c1c', '#880e4f', '#4a148c', '#311b92', '#1a237e',
    '#d32f2f', '#c2185b', '#c2185b', '#512da8', '#303f9f',
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#e57373', '#f06292', '#ba68c8', '#9575cd', '#7986cb',
    '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9',

    '#0d47a1', '#01579b', '#006064', '#004d40', '#194d33',
    '#1976d2', '#0288d1', '#0097a7', '#00796b', '#388e3c',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#64b5f6', '#4fc3f7', '#4dd0e1', '#4db6ac', '#81c784',
    '#bbdefb', '#b3e5fc', '#b2ebf2', '#b2dfdb', '#c8e6c9',

    '#c8e6c9', '#827717', '#f57f17', '#ff6f00', '#e65100',
    '#689f38', '#afb42b', '#fbc02d', '#ffa000', '#f57c00',
    '#f57c00', '#f57c00', '#ffeb3b', '#ffc107', '#ff9800',
    '#aed581', '#dce775', '#fff176', '#ffd54f', '#ffb74d',
    '#dcedc8', '#f0f4c3', '#fff9c4', '#ffecb3', '#ffe0b2',

    '#bf360c', '#3e2723', '#263238', '#000000',
    '#e64a19', '#5d4037', '#455a64', '#525252',
    '#ff5722', '#795548', '#607d8b', '#969696',
    '#ff8a65', '#a1887f', '#90a4ae', '#d9d9d9',
    '#ffccbc', '#d7ccc8', '#cfd8dc', '#ffffff'
  ];

  // プリセット色からランダムに色を選ぶ
  const getRandomPresetColor = () => {
    const randomIndex = Math.floor(Math.random() * defaultColors.length);
    return defaultColors[randomIndex];
  }

  var initialColor = getRandomPresetColor();

  const [color, setColor] = useState(initialColor);

  // react-hook-formを使う準備
  const { 
    register, 
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    criteriaMode: "all",     // 発生した全てのエラーを受け取る
    defaultValues: {         // 初回レンダリング時のフォームのデフォルト値
      family_name: '',
      given_name: '',
      color: initialColor
    }
  });

  // 登録ボタンを押したときの処理
  const onSubmit = data => {
    google.script.run.withSuccessHandler(function(){alert("登録が完了しました");}).withFailureHandler(function(){alert("登録に失敗しました。もう一度行ってください");}).addTeacher(data);
    reset();
    initialColor = getRandomPresetColor();
    setValue("color", initialColor);
    setColor(initialColor);
  };

  const handleChange = color => {
    setValue("color", color.hex);
    setColor(color.hex);
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
          placeholder='色(下から選択してください)'
          {...register("color",{
            required: "色を入力してください",
          })}
          type="text"
          disabled={true}
        />
        {errors.color && <p style={{ color: "red" }}>{errors.color.message}</p>}
        <SwatchesPicker onChange={handleChange} className="m-3" color={getValues("color")}/>
      </div>
      <button 
        type="submit"
        className="py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-3xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white">
        登録
      </button>
    </form>
  )
}

export default AddTeacherForm