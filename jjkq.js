import tkinter as tk
from tkinter import filedialog, Label
from tkinter import messagebox, simpledialog
import os
import subprocess
import requests
import json
import shutil
import time
from threading import Thread
from concurrent.futures import ThreadPoolExecutor, as_completed
import base64
import random
import string
from bmob import *
from PIL import Image, ImageDraw, ImageFont, ImageTk
import qrcode
from io import BytesIO
from tqdm import tqdm  # 导入 tqdm
def uiui():
    if not os.path.exists("666.txt"):
        return ""
    with open("666.txt", "r") as f:
        content = f.read()
        print(content)
    return content

def generate_qrcode(url):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    return img

def display_qrcode(url):
    
    img = generate_qrcode(url)
    resized_img = img.resize((2000, 2000), Image.LANCZOS)

# 创建一个红色背景图像
    background_img = Image.new("RGBA", resized_img.size, color="red")

# 将调整大小后的二维码图像粘贴到背景图像上
    background_img.paste(resized_img, (0, 0))

# 创建一个新的图片，尺寸比原二维码大一些，用于放置带边框的二维码
    new_img = Image.new('RGBA', (background_img.width + 60, background_img.height + 60), (255,192,203))

# 将带有背景的二维码粘贴到新图片上
    new_img.paste(background_img, (20, 20))



# 保存处理后的图片
    new_img.save("temp_qrcode.png")
    api_url = "https://msmarket.msx.digitalyili.com/gateway/api/commons/common/file/upload"
       

    headers = {'User-Agent': 'Mozilla/5.0','access-token': 'oSs9vZOVVA70ugXxIUIi+5enJXbFS9C4y2YMbhoKu8mrHphmkpP4DbyBYYCaLb5j1s5kUdPe0TKR1g1WrxR67b89ktXkJl4u5dkUp32nQ6w='}
    cookies = {'Cookie': 'pgv_pvid=5642411380; RK=GuHIkztdRE; ptcz=55f76c636759d585028341a8965e62a4ecf379ceb35c48ad8303dd44b5598d73; qq_domain_video_guid_verify=2deb7a01cf61ff45; tvfe_boss_uuid=98d2b9377fd02b1d; fqm_pvqid=24e12e13-ce37-43fb-9c59-e7c9f537de89; o_cookie=2422483200; _t_qbtool_uid=5e7777d68c61102cebcd0993377988cb; _ga=GA1.1.643483315.1698692210; _qimei_fingerprint=33c3b4cf3ae1328ae6037e0496506054; _qimei_h38=527f7c30bb543a73124a7a9a0200000f11781a; _qimei_q36=; _clck=m33bp|1|fid|0; pac_uid=1_2422483200; iip=0; _qimei_uuid42=181131014311007a66b1e1563fe8153f6d0f0f5563; ptui_loginuin=1521239297; _horizon_uid=774abaf8-d852-4e2d-a3c9-ae0e5d8ad069; __wj_userid=774abaf8-d852-4e2d-a3c9-ae0e5d8ad069; _ga_TPFW0KPXC1=GS1.1.1712353781.4.0.1712353781.0.0.0; _qpsvr_localtk=0.22877773635703536; pgv_info=ssid=s8335269226; uin=o1521239297; skey=@90i7h41ts; verifysession=h016139cdb03f10fc6d5e0b5903dcf5512783d5b04e4b22bc22f342b03fa7cf42ba913bfe20fea9de94; _horizon_sid=783bac91-0f0e-446b-ac99-bd0efb552ae4; _tucao_session=dTlSc2UyZndVbUgzNTlzRVQ0cGhMY0JIRTRiVjhvU1gvSzAzVFhVSDNYK21STjJhODBDeUJUSTBPamZOZVo4eEkyait0QllBZUJOYmtia0lweUtFSzhHZEFFd3UyYVh4WExSNXZ3cjJlMHNjN3V1OFJiSkdiSlBXT2o4dmZUdm9JRzBiblhzUlFONWVVQ2FQempXamtRPT0%3D--9JvGZKXRLFLl5Mysje9pFA%3D%3D--MGZmM2QxNjU1MTNiNWE2MTg4NmI0MzE3YWZjZWQzNmM%3D; _tucao_custom_info=ZE8wZG5yZHdBMFduVlZsZi9LZEZSNDNaOCsvcW5ybmN3emMyWVo4U3l0cTVjV0NIcTg2TGJwMFFnc05MTHNWSg%3D%3D--dxELfdrrGxuZV6DVUKkKWw%3D%3D--MmNiMjI3MzZhNGVhZjI5ZDI0NmVkNWMwNmQxODZkOGQ%3D'}

    with open("temp_qrcode.png", "rb") as f:
        files = {"multipartFile": f}
        data = {"type": "post"}
        session = requests.Session()
        response = session.post(api_url, headers=headers , cookies=cookies,files=files,data=data)
        print(response)
    data = response.json()
    print(data)
    file_url666 = data['data']
    print(file_url666)
    global new_text2
    new_text2 = tk.Text(window, height=5, width=10, bg="#000000", fg="#32CD32")
    new_text2.insert(tk.END, file_url666)
    new_text2.grid(row=8, column=0, columnspan=6, sticky="nsew", pady=10)
    right_click_menu = tk.Menu(window, tearoff=0)
    right_click_menu.add_command(label="复制", command=clipboard_copy2)
    new_text2.bind("<Button-3>", lambda e: right_click_menu.post(e.x_root, e.y_root))
def update_data():
    objectId = entry.get()
    if objectId == "":
        result_label.config(text="错误")
    else:
        b = Bmob("2b86794fad8cedc700568d321d0c44d4", "c4f2e34a944e065ae913cb481cb12a59")
        className="zlyh"
        
        file_path = os.path.expanduser("~/System")
    with open(file_path, "r") as file:
        content = file.read()
        
        data={
                "mm": content
            }
        result = b.findOne(className, objectId).jsonData['mm']
        
        if result == "1":
            result_label.config(text="激活成功")
            b.update(className, objectId, data)
            with open("666.txt", "w") as f:
                 f.write(objectId)
            abcd()
        elif len(result) > 1:
            result_label.config(text="这是别人激活码")
            
            if content==result:
              result_label.config(text="激活成功啦")
              abcd()
            else:
              result_label.config(text="激活失败")
            
    

# 检查激活文件是否存在，如果不存在则生成该文件
file_path = os.path.expanduser("~/System")
if not os.path.isfile(file_path):
    activation_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=32))
    with open(file_path, "w") as file:
        file.write(activation_code)


def abcd():
    entry.grid_forget()
    button.grid_forget()
    result_label.grid_forget()
    status_label.grid_forget()
    image_label.grid_forget()
    status_label.grid(row=5, column=0, columnspan=6, sticky="nsew", padx=10)

    browse_button.grid(row=4, column=0, columnspan=6, pady=30)
    status_label.grid(row=5, column=0, columnspan=6, sticky="nsew", padx=10)
    button_entry.grid(row=1, column=3)
    link_entry.grid(row=1, column=2)
    title_entry.grid(row=1, column=1)
def check_output_folder():
    output_dir = "./output"
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
        print("已删除 output 文件夹")

check_output_folder()

def save_config():
    config = {
        "title": title_entry.get(),
        "button": button_entry.get(),
        "link": link_entry.get()
    }
    with open("config.json", "w") as f:
        json.dump(config, f)

def load_config():
    try:
        with open("config.json", "r") as f:
            config = json.load(f)
            title_entry.delete(0, tk.END)
            title_entry.insert(0, config["title"])
            button_entry.delete(0, tk.END)
            button_entry.insert(0, config["button"])
            link_entry.delete(0, tk.END)
            link_entry.insert(0, config["link"])
    except FileNotFoundError:
        status_label.config(text="")
def get_file_size(file_path):
    size_in_bytes = os.path.getsize(file_path)
    size_in_mb = size_in_bytes / (1024 * 1024)
    size_in_mb = int(size_in_mb)  # 将文件大小转换为整数
    return size_in_mb
def clipboard_copy():
    new_text.tag_add("sel", "1.0", "end")
    selected_text = new_text.get("sel.first", "sel.last")
    window.clipboard_clear()
    window.clipboard_append(selected_text)
def clipboard_copy2():
    new_text2.tag_add("sel", "1.0", "end")
    selected_text2 = new_text2.get("sel.first", "sel.last")
    window.clipboard_clear()
    window.clipboard_append(selected_text2)
def convert_and_upload(file_path):
    file_size_mb = get_file_size(file_path)
    status_label.config(text="正在上传...")
    output_dir = "./output"
    os.makedirs(output_dir, exist_ok=True)
    status_label.config(text="正在上传...")
    try:
        
        ffmpeg_path = './ffmpeg.exe'
        command = [
            ffmpeg_path,
            "-i", file_path,
            '-codec:v', 'copy',
            '-codec:a', 'copy',
            '-start_number', '0',
            "-threads", "1000",
            "-f", "hls",
            "-hls_time", "5",
            "-hls_list_size", "0",
            '-hls_segment_filename', f'{output_dir}/segment_%03d.ts',
            f"{output_dir}/666.m3u8"
        ]
        print("正在上传。。。")
        subprocess.run(command)
        
        segment_count = 0
        for filename in os.listdir(output_dir):
            if filename.endswith(".ts"):
                segment_count += 1

        print(f"切片数量：{segment_count}")
        
        status_label.config(text=f"●●●正在上传：{segment_count}个切片，共：{file_size_mb} MB（不要退出）●●●")
        window.update_idletasks()
        m3u8_path = os.path.join(output_dir, "666.m3u8")
        with open(m3u8_path, "r") as f:
            content = f.read()
            
        modified_content = content.replace(".ts", ".png")
        with open(m3u8_path, "w") as f:
            f.write(modified_content)

        rename_ts_to_png(output_dir)
        
        upload_png_files(output_dir)
        
        api_url = "https://m.awc.asia/api/index/upload.php"
       

        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3','mchid':'1','token':'54aa4bf7-0fd6-4ecc-b7fe-f98a9008fc2b'}
            
        with open(m3u8_path, "rb") as f:
            files = {"file": f}
            session = requests.Session()
            response = session.post(api_url, headers=headers, files=files)

        data = response.json()
        file_url = data['fileUrl']
        print(file_url)

        btfile=title_entry.get()+",,"+link_entry.get()+",,"+button_entry.get()+",,"+file_url

        encoded_file_url = base64.b64encode(btfile.encode('utf-8'))
        reversed_s = encoded_file_url[::-1]
        global new_text
        new_text = tk.Text(window, height=5, width=10, bg="#000000", fg="#32CD32")
        new_text.insert(tk.END, "https://manager.iread.org.cn/https:/im.qq.com/https:/www.tencent.com/zh-cn.html?u="+reversed_s.decode('utf-8'))
        new_text.grid(row=7, column=0, columnspan=6, sticky="nsew", pady=10)
        right_click_menu = tk.Menu(window, tearoff=0)
        right_click_menu.add_command(label="复制", command=clipboard_copy)

        # 绑定右键菜单到文本框
        new_text.bind("<Button-3>", lambda e: right_click_menu.post(e.x_root, e.y_root))
        url="https://manager.iread.org.cn/https:/im.qq.com/https:/www.tencent.com/zh-cn.html?u="+reversed_s.decode('utf-8')
        display_qrcode(url)
       
        files["file"].close()
        shutil.rmtree(output_dir)
    except Exception as e:
        status_label.config(text=f"转换和上传失败：{e}")
        print(response.text)

def rename_ts_to_png(directory):
    total_files = len([filename for filename in os.listdir(directory) if filename.endswith(".ts")])
    for i, filename in enumerate(os.listdir(directory)):
        if filename.endswith(".ts"):
            old_path = os.path.join(directory, filename)
            new_filename = os.path.splitext(filename)[0] + ".png"
            new_path = os.path.join(directory, new_filename)
            os.rename(old_path, new_path)

def upload_png_files(output_dir):
    base_url = "https://api-blx.benlai.com/groundwork/p/i/oss/uploadFile?baseDir=wechat/feedBack&fileType=img&systemName=member"
    m3u8_path = os.path.join(output_dir, "666.m3u8")
    png_files = [filename for filename in os.listdir(output_dir) if filename.endswith(".png")]
    total_files = len(png_files)

    def upload_and_update(filename):
        url = upload_png_file(base_url, os.path.join(output_dir, filename))
        if url:
            update_m3u8_file(m3u8_path, filename, url)
        return url

    with ThreadPoolExecutor() as executor:
        results = list(tqdm(executor.map(upload_and_update, png_files), total=total_files, desc="Uploading files"))
        
    with open("777.txt", "w") as f:
        for url in results:
            f.write(url + "\n")
        window.update()

    status_label.config(text="↓↓↓上传完成请复制链接或二维码链接↓↓↓")
    
def upload_png_file(url, png_path):
    try:
        with open(png_path, 'rb') as file:
            session = requests.Session()
            session.trust_env = False  # 禁用系统代理
            response = session.post(url, files={'file': file})
            response.raise_for_status()
            data = response.json()
            uploaded_url = data['data']['url']
            return uploaded_url
    except Exception as e:
        print(f"上传文件 {png_path} 失败：{e}")

def update_m3u8_file(m3u8_path, filename, url):
    
    with open(m3u8_path, "r") as f:
        content = f.read()
    modified_content = content.replace(filename, url)
    with open(m3u8_path, "w") as f:
        f.write(modified_content)

def browse_file():
    filetypes = [('视频文件', '*.mp4;*.avi;*.mkv;*.mov')]
    file_path = filedialog.askopenfilename(filetypes=filetypes)
    
    config = {
        "title": title_entry.get(),
        "button": button_entry.get(),
        "link": link_entry.get()
        
    }
    with open("config.json", "w") as f:
        json.dump(config, f)
    if file_path:
        convert_and_upload(file_path)
        
def center_window(window, width, height):
    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()

    x = (screen_width - width) // 2
    y = (screen_height - height) // 2

    window.geometry(f"{width}x{height}+{x}+{y}")
def center_window(window, window_width, window_height):
    screen_width = window.winfo_screenwidth()
    screen_height = window.winfo_screenheight()
    x = (screen_width - window_width) // 2
    y = (screen_height - window_height) // 2
    window.geometry(f"{window_width}x{window_height}+{x}+{y}")

def paste_text(entry):
    entry.event_generate("<<Paste>>")
window = tk.Tk()
window.title("久久狂切直链1.2    TG：nb_789")

window.config(bg="red")
window.configure(bg="#7B68EE")
window.resizable(False, False)
window_width = 430
window_height = 400

center_window(window, window_width, window_height)
title_entry = tk.Entry(window, width=15, bg="#7B68EE", fg="#ffffff")
title_entry.grid(row=1, column=1)
title_entry.insert(tk.END, "这是标题")
link_entry = tk.Entry(window, width=35, bg="#7B68EE", fg="#ffffff")
link_entry.grid(row=1, column=2)
link_entry.insert(tk.END, "https://这是链接.com")
button_entry = tk.Entry(window, width=10, bg="#7B68EE", fg="#ffffff")
button_entry.grid(row=1, column=3)
button_entry.insert(tk.END, "这是按钮")

# 创建上下文菜单
context_menu = tk.Menu(window, tearoff=0)
context_menu.add_command(label="粘贴", command=lambda: paste_text(window.focus_get()))  # 点击菜单项时执行粘贴操作

# 绑定右键点击事件
title_entry.bind("<Button-3>", lambda e: context_menu.post(e.x_root, e.y_root))
link_entry.bind("<Button-3>", lambda e: context_menu.post(e.x_root, e.y_root))
button_entry.bind("<Button-3>", lambda e: context_menu.post(e.x_root, e.y_root))

status_label = tk.Label(window,  text="↑↑↑请选择视频文件↑↑↑", bg="#000000", fg="#7B68EE")
status_label.grid(row=5, column=0, columnspan=6, sticky="nsew", padx=10)
load_config()
browse_button = tk.Button(window, )# state=tk.DISABLED
browse_button.configure(text="选择视频")
browse_button.configure(width=56)
browse_button.configure(command=browse_file)
browse_button.configure(bg="#000000", fg="white")
browse_button.configure(relief="flat")
browse_button.grid(row=4, column=0, columnspan=6, pady=30)

result_label = tk.Label(window, text="↓↓↓↓请输入激活码↓↓↓↓")
result_label.configure(width=60)
result_label.grid(row=8, column=0, columnspan=6, pady=0)

entry = tk.Entry(window,)
entry.configure(width=60)
entry.insert(0, uiui())  # 在输入框的起始位置插入"默认文本"
entry.configure(fg="#000000")
entry.configure(relief="flat")
entry.grid(row=9, column=0, columnspan=6, pady=0)


button = tk.Button(window,)
button.configure(text="验证")
button.configure(width=60)
button.configure(command=update_data)
button.configure(bg="#000000", fg="white")
button.configure(relief="flat")
button.grid(row=10, column=0, columnspan=6, pady=0)


url = "https://edu-30130.sz.gfp.tencent-cloud.com/ide/185e76a07f6c15f8e69127be15128abd.png"
random_number = random.randint(1, 100)  # 生成1到100之间的随机整数
new_url = url +"?"+ str(random_number) # 替换为你的图片链接
response = requests.get(new_url)
img_data = response.content

image = Image.open(BytesIO(img_data))
photo = ImageTk.PhotoImage(image)

image_label = tk.Label(window, image=photo, width=120, height=120)
image_label.grid(row=11, column=0, columnspan=6, pady=50)

title_entry.grid_forget()
link_entry.grid_forget()
button_entry.grid_forget()
browse_button.grid_forget()
status_label.grid_forget()
window.mainloop()
