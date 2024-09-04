import { useForm } from 'react-hook-form'

const AddTeacher = () => {

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
    formState: { errors }
  } = useForm({
    criteriaMode: "all",     // 発生した全てのエラーを受け取る
    defaultValues: {         // 初回レンダリング時のフォームのデフォルト値
      familyName: '',
      firstName: '',
      color: generateRandomColor()
    }
  });

  return (
    <form>
      <div>
        <input
          placeholder='苗字'
          {...register("familyName",{
            required: "苗字を入力してください"
          })}
          type="text"
        />
        {errors.familyName && <p style={{ color: "red" }}>{errors.familyName.message}</p>}
      </div>
    </form>
  )
}

export default AddTeacher