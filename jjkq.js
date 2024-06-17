
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
import re
def uiui():
    if not os.path.exists("666.txt"):
        return ""
    with open("666.txt", "r") as f:
        content = f.read()
        #print(content)
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
    new_img.save("二维码.png")
    api_url = "https://shopapi.sissyun.com.cn/o2o/oss/ashx/upload.ashx"
       

    headers = {'User-Agent': 'Mozilla/5.0','access-token': 'oSs9vZOVVA70ugXxIUIi+5enJXbFS9C4y2YMbhoKu8mrHphmkpP4DbyBYYCaLb5j1s5kUdPe0TKR1g1WrxR67b89ktXkJl4u5dkUp32nQ6w='}
    cookies = {'Cookie': ''}
    with open("二维码.png", "rb") as f:
        files = {"file": f}
        data = {"type": "image"}
        session = requests.Session()
        response = session.post(api_url, headers=headers , cookies=cookies,files=files,data=data)
        #print(response)
    data = response.json()
    #print(data)
    file_url666 = data['response']
    #print(file_url666)
    global new_text2
    new_text2 = tk.Text(window, height=3, width=10, bg="#000000", fg="#32CD32")
    new_text2.insert(tk.END, file_url666)
    new_text2.grid(row=8, column=0, columnspan=6, sticky="nsew", pady=10)
    right_click_menu = tk.Menu(window, tearoff=0)
    right_click_menu.add_command(label="复制", command=clipboard_copy2)
    new_text2.bind("<Button-3>", lambda e: right_click_menu.post(e.x_root, e.y_root))
def update_data():
    objectId = entry.get()
    if not objectId:
        result_label.config(text="错误")
        return

    b = Bmob("4f25ea238b6d8bb57b38a0f9a9c585a0", "222f583bb51d79c471ee8adee6e96b7f")
    className = "jjkq"
    file_path = os.path.expanduser("~/System")

    try:
        with open(file_path, "r") as file:
            content = file.read()

        data = {"mm": content}
        result1 = b.find(className, {"m": objectId}).jsonData['results'][0]['objectId']
        result = b.findOne(className, result1).jsonData['mm']
        sj = b.findOne(className, result1).jsonData['sj']['iso']
        current_date = time.strftime("%Y-%m-%d", time.localtime())
        timestamp = time.mktime(time.strptime(sj, "%Y-%m-%d %H:%M:%S"))
        new_timestamp = timestamp + 30 * 24 * 60 * 60  # 加30天的秒数
        new_date = time.strftime("%Y-%m-%d", time.localtime(new_timestamp))

        print(objectId, "到期时间：", new_date)
        print('''
　　     ∧_∧　
　     （ ˘ω˘ ） 
　       /　⊃⊃
　      /　   づ''')

        if current_date >= new_date:
           print("宝贝到期啦")
        else:
            if result == "1" or content == result:
                result_label.config(text="激活成功")
                b.update(className, result1, data)
                with open("666.txt", "w") as f:
                    f.write(objectId)
                abcd()
            else:
                print("激活失败")
                result_label.config(text="激活失败")
    except Exception as e:
        print("激活码错误")
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
    bottom_label.grid_forget()
    switchbb.grid_forget()
    status_label.grid(row=5, column=0, columnspan=6, sticky="nsew", padx=10)

    browse_button.grid(row=4, column=0, columnspan=6, pady=30)
    status_label.grid(row=5, column=0, columnspan=6, sticky="nsew", padx=10)
    button_entry.grid(row=1, column=3)
    link_entry.grid(row=1, column=2)
    title_entry.grid(row=1, column=1)
    switch.grid(row=2, column=1)
    tcnr.grid(row=2, column=2)
    tzlj.grid(row=2, column=3)

    # 创建底部按钮区域
    button_frame = tk.Frame(window)
    button_frame.place(x=0, y=window_height-30, width=window_width, height=30)

# 创建三个按钮
    button1 = tk.Button(button_frame, text="首页", bg="#FF1493", height=10, fg="#fff")
    button1.place(x=0, y=0, width=window_width//3, height=30)

    button2 = tk.Button(button_frame, text="图床", bg="#FF1493", height=10, fg="#fff")
    button2.configure(command=upload_image)
    button2.place(x=window_width//3, y=0, width=window_width//3, height=30)

    button3 = tk.Button(button_frame, text="我的", bg="#FF1493", height=10, fg="#fff")
    button3.configure(command=wd)
    button3.place(x=2*window_width//3, y=0, width=window_width//3, height=30)
def check_output_folder():
    output_dir = "./output"
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
        print("已删除 output 文件夹")

check_output_folder()

def save_config():
    config = {
        f"title": title_entry.get(),
        f"button": button_entry.get(),
        f"link": link_entry.get(),
        f"switch": switch_var.get(),
        f"tcnr": tcnr.get(),
        f"tzlj": tzlj.get()
        
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

            
            
        if 'tcnr' in config and 'tzlj' in config:
            tcnr_var.set(config["tcnr"])
            tzlj_var.set(config["tzlj"])
        else:
             tcnr.insert(0, "弹窗内容")
             tcnr.config(insertbackground="#ffffff", insertborderwidth=1)
             tzlj.insert(0, "跳转链接")
             tzlj.config(insertbackground="#ffffff", insertborderwidth=1)
            
            

            
            
               
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
def modify_m3u8_file(m3u8_path):
    with open(m3u8_path, 'r') as file:
        lines = file.readlines()

    modified_lines = []
    i = 0
    while i < len(lines):
        if not lines[i].startswith("segment"):
            modified_lines.append(lines[i])
            i += 1
        else:
            i += 2

    with open(m3u8_path, 'w') as file:
        file.writelines(modified_lines)





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
        #print("正在上传。。。")
        subprocess.run(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
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
        
        upload_png_files666(output_dir)
        
        #api_url = "https://westore.nhsoft.cn/mercury/api/third/v1/oss/upload_aliyun_oss?platform=2"
        api_url = "https://sfa.cic.cn/miniprogram/api/v6/common/ossUpload?filePath=map-miniprogram-web/static/userInfo/headImg"
       

        headers = {'Tenant-Id':'7656490026'}
            
        with open(m3u8_path, "rb") as f:
            modify_m3u8_file(m3u8_path)
            #file_name = f"tmp_{''.join(random.choices(string.ascii_letters + string.digits, k=32))}.m3u8"
            
            #files = {"file": (file_name, f)}
            files = {"file": f}
            session = requests.Session()
            response = session.post(api_url, headers=headers, files=files)

        data = response.json()
        file_url = data['data']
        if switch_var.get()==1:
            btfile=title_entry.get()+",,"+link_entry.get()+",,"+button_entry.get()+",,"+file_url+",,"+""+str(switch_var.get())+""+",,"+tcnr.get()+",,"+tzlj.get()
        else:
            btfile=title_entry.get()+",,"+link_entry.get()+",,"+button_entry.get()+",,"+file_url+",,"+""+str(switch_var.get())+""+",,"+""+",,"+""
        #print(btfile)
        print("上传成功！")
        encoded_file_url = base64.b64encode(btfile.encode('utf-8'))
        reversed_s = encoded_file_url[::-1]
        global new_text
        
        link1 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4071.html"
        link2 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4072.html"
        link3 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4073.html"
        link4 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4074.html"
        link5 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4075.html"       
        link6 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4076.html"
        link7 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4077.html"
        link8 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4078.html"
        link9 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4079.html"
        link10 = "https://oss.homeee.com/OverseasChn/Formal/TH/rent/wKSfBHwv-ff417e07c8ffff4a195dc5bf25b32280a01b4710.html"
        # 将链接放入列表中
        links = [link2,link3,link4,link5,link6,link7,link8,link9,link10]

        # 使用random.choice()从列表中随机选择一个链接
        url = random.choice(links)+"?u="+reversed_s.decode('utf-8')
        print(url)
        
        new_text = tk.Text(window, height=8, width=10, bg="#000000", fg="#32CD32")
        new_text.insert(tk.END, url)
        new_text.grid(row=7, column=0, columnspan=6, sticky="nsew", pady=10)
        right_click_menu = tk.Menu(window, tearoff=0)
        right_click_menu.add_command(label="复制", command=clipboard_copy)
        
        new_text.bind("<Button-3>", lambda e: right_click_menu.post(e.x_root, e.y_root))
        
        display_qrcode(url)
       
        files["file"].close()
        shutil.rmtree(output_dir)
    except Exception as e:
        status_label.config(text=f"转换和上传失败：{e}")
        print(e)

def rename_ts_to_png(directory):
    total_files = len([filename for filename in os.listdir(directory) if filename.endswith(".ts")])
    for i, filename in enumerate(os.listdir(directory)):
        if filename.endswith(".ts"):
            old_path = os.path.join(directory, filename)
            new_filename = os.path.splitext(filename)[0] + ".png"
            new_path = os.path.join(directory, new_filename)
            os.rename(old_path, new_path)
def upload_png_files666(output_dir):
     print(switchbb_var.get())
     if switchbb_var.get() == 1:
        upload_png_files2(output_dir)
     else:
         upload_png_files1(output_dir)
         
def upload_png_files2(output_dir):
    base_url = "https://mall.xiangtuan.xyz/api/member/multi/member/uploadAvatar"
    m3u8_path = os.path.join(output_dir, "666.m3u8")
    png_files = [filename for filename in os.listdir(output_dir) if filename.endswith(".png")]
    total_files = len(png_files)

    def update_m3u8_file(m3u8_path, upload_results):
        with open(m3u8_path, "r") as f:
            content = f.read()

        for filename, url in upload_results.items():
            content = content.replace(filename, url)

        with open(m3u8_path, "w") as f:
            f.write(content)

    def upload_and_update(filename):
        url = upload_png_file(base_url, os.path.join(output_dir, filename))
        if url:
            upload_results[filename] = url
            print(f"已上传 {filename} 个.")

    upload_results = {}  # 上传结果的缓存

    with ThreadPoolExecutor() as executor:
        list(tqdm(executor.map(upload_and_update, png_files), total=total_files, desc="上传进度："))

    update_m3u8_file(m3u8_path, upload_results)

    #with open("777.txt", "w") as f:
        #for url in upload_results.values():
            #f.write(url + "")
        #window.update()

    status_label.config(text="↓↓↓上传完成请复制链接或二维码链接↓↓↓")

def upload_png_files1(output_dir):
    base_url = "https://activity.yonghuivip.com/api/web/user/member/upload/image/775?platform=wechatminiprogram"
    m3u8_path = os.path.join(output_dir, "666.m3u8")
    png_files = [filename for filename in os.listdir(output_dir) if filename.endswith(".png")]
    total_files = len(png_files)

    def update_m3u8_file(m3u8_path, upload_results):
        with open(m3u8_path, "r") as f:
            content = f.read()

        for filename, url in upload_results.items():
            content = content.replace(filename, url)

        with open(m3u8_path, "w") as f:
            f.write(content)

    def upload_and_update(filename):
        url = upload_png_file(base_url, os.path.join(output_dir, filename))
        if url:
            upload_results[filename] = url

    upload_results = {}  # 上传结果的缓存

    with ThreadPoolExecutor() as executor:
        list(tqdm(executor.map(upload_and_update, png_files), total=total_files, desc="上传进度："))

    update_m3u8_file(m3u8_path, upload_results)

    #with open("777.txt", "w") as f:
        #for url in upload_results.values():
            #f.write(url + "\n")
        #window.update()

    status_label.config(text="↓↓↓上传完成请复制链接或二维码链接↓↓↓")
def upload_png_file(url, png_path):
    try:
        with open(png_path, 'rb') as file:
            session = requests.Session()
            session.trust_env = False  # 禁用系统代理
            headers = {'utoken': '2d012ff1b64c4f9114b77704cb82c4ac','token': 'gh_e61ff6124379'}  # 添加所需的header
            response = session.post(url, files={'file': file},headers=headers)
            response.raise_for_status()
            data = response.json()
            #print(data)
            uploaded_url = data['data']['headImgUrl']
            return ""+uploaded_url
    except Exception as e:
        print(f"修复 {png_path} 文件：{e}成功")
        return ""

def browse_file():
    filetypes = [('视频文件', '*.mp4;*.avi;*.mkv;*.mov')]
    file_path = filedialog.askopenfilename(filetypes=filetypes)
    print(switch_var.get())
    config = {
        f"title": title_entry.get(),
        f"button": button_entry.get(),
        f"link": link_entry.get(),
        f"switch": switch_var.get(),
        f"tcnr": tcnr.get(),
        f"tzlj": tzlj.get()
        
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
def on_switch():
    if switch_var.get() == 1:
        tcnr.config(state=tk.NORMAL)
        tzlj.config(state=tk.NORMAL)
        load_config()
    else:
        tcnr.config(state=tk.DISABLED)
        tzlj.config(state=tk.DISABLED)
        tcnr_var.set("")
        tzlj_var.set("")

window = tk.Tk()
window.title("A久久狂切直链1.2")

window.config(bg="red")
window.configure(bg="#FF1493")
window.resizable(False, False)
window_width = 430
window_height = 430
center_window(window, window_width, window_height)
window.geometry(f"{window_width}x{window_height}")

title_entry = tk.Entry(window, width=15, bg="#FF1493", fg="#ffffff")
title_entry.grid(row=1, column=1)
title_entry.insert(tk.END, "这是标题")
link_entry = tk.Entry(window, width=25, bg="#FF1493", fg="#ffffff")
link_entry.grid(row=1, column=2)
link_entry.insert(tk.END, "https://这是链接.com")
button_entry = tk.Entry(window, width=20, bg="#FF1493", fg="#ffffff")
button_entry.grid(row=1, column=3)
button_entry.insert(tk.END, "这是按钮")

switch_var = tk.IntVar()
switch = tk.Checkbutton(window, text="弹窗显示", variable=switch_var, command=on_switch, bg="#FF1493", fg="#D8BFD8")
switch.grid(row=2, column=1)

switchbb_var = tk.IntVar()
switchbb = tk.Checkbutton(window, text="切换普通版", variable=switchbb_var, bg="#FF1493", fg="#D8BFD8")
switchbb.grid(row=125, column=0)

tcnr_var = tk.StringVar()
tcnr = tk.Entry(window, width=25, bg="#FF1493", fg="#ffffff", state=tk.DISABLED, disabledbackground="#FF1493", disabledforeground="#ffffff", textvariable=tcnr_var)
tcnr.grid(row=2, column=2)


tzlj_var = tk.StringVar()
tzlj = tk.Entry(window, width=20, bg="#FF1493", fg="#ffffff", state=tk.DISABLED, disabledbackground="#FF1493", disabledforeground="#ffffff", textvariable=tzlj_var)
tzlj.grid(row=2, column=3)



# 创建上下文菜单
context_menu = tk.Menu(window, tearoff=0)
context_menu.add_command(label="粘贴", command=lambda: paste_text(window.focus_get()))  # 点击菜单项时执行粘贴操作

# 绑定右键点击事件
title_entry.bind("<Button-3>", lambda e: context_menu.post(e.x_root, e.y_root))
link_entry.bind("<Button-3>", lambda e: context_menu.post(e.x_root, e.y_root))
button_entry.bind("<Button-3>", lambda e: context_menu.post(e.x_root, e.y_root))

status_label = tk.Label(window,  text="↑↑↑请选择视频文件↑↑↑", bg="#000000", fg="#FF1493")
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

bottom_label = tk.Label(window, text="本软件主要提供视频切片上传服务,严禁用本软件违反国家法律的用途\n发现违规一律封号不予解封,且造成的法律后果本作者不予承担\n本软件并无视频存储服务", bg="#FF1493", fg="#ffffff")
bottom_label.configure(width=60)
bottom_label.grid(row=12, column=0, columnspan=6, pady=0)

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

def upload_image():
        
        filetypes = [('视频文件', '*.png;*.jpg;*.jpeg;')]
        file_path = filedialog.askopenfilename(filetypes=filetypes)
        if file_path:
            print("正在上传图片....")
            with open(file_path, 'rb') as f:
                files = {'file': f}
                response = requests.post('https://shopapi.sissyun.com.cn/o2o/oss/ashx/upload.ashx', files=files)
                if response.status_code == 200:
                    data = response.json()
                    print(data['response'])
                    print("全选上方链接Ctrl+C复制")
def wd():
    print("敬请期待....")
def open_new_window():
    new_window = tk.Toplevel(window)
    new_window.title("久久图床")
    new_window.geometry("330x300+{}+{}".format(window.winfo_x()+50, window.winfo_y()+200))
    tk.Label(new_window, text="这是一个新窗口").pack()
    new_window.config(bg="red")
    new_window.configure(bg="#ffffff")

    def upload_image():
        file_path = filedialog.askopenfilename()
        if file_path:
            with open(file_path, 'rb') as f:
                files = {'file': f}
                response = requests.post('https://xinv4.youdawangluo.com/web/index.php?_mall_id=1&r=api/attachment/upload', files=files)
                if response.status_code == 200:
                    data = response.json()
                    print(data['data']['url'])
                    
                    url_entry.delete(0, tk.END)
                    url_entry.insert(0, data['data']['url'])
        return # Prevent the function from completing and closing the new window

    upload_button = tk.Button(new_window, text="选择图片并上传", command=upload_image)
    upload_button.pack()

    url_entry = tk.Entry(new_window)
    url_entry.pack()
    



#window.after(10, open_new_window)
title_entry.grid_forget()
link_entry.grid_forget()
button_entry.grid_forget()
browse_button.grid_forget()
status_label.grid_forget()
switch.grid_forget()
tcnr.grid_forget()
tzlj.grid_forget()
switchbb.grid_forget()


window.mainloop()
