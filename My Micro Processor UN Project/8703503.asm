     
;*************************************************
;*             Project:                          *
;* compare 2 signed numbers(16 bit),(-9999,9999) *
;*                                               *
;*              By:Omid Gharib                   * 
;*	            STD_ID:8703503                   *
;*         E-Mail:omidgharib@yahoo.com           *
;*                                               *
;*                                               *
;*	           CopyRight(C) 2011                 *
;*             All Right Reserved                *
;*                                               *
;*************************************************


data segment 
    pkey db "press any key...$" 
    welcome db "WelCome to Compare 2 signed numbers......",007,'$'
    inputfirst  db "Please input first number:",007,'$'
    inputsecond db "please input second number:",007,'$'
    equal db 'two numbers are equal ','$'
    great db 'the first number is greater than the second number','$'
    less  db 'the first number is less than the second number','$'
    cr   db 010,'$'
    str1 db 7,5 dup('$'),'$'
    str2 db 7,5 dup('$'),'$' 
    num1 dw 0
    num2 dw 0
    l    dw 0   ;length of string
    ten  dw 10
    nega dw -1
   ifneg dw 0
    
ends

stack segment
    dw   128  dup(0)
ends

code segment
start:
; set segment registers:
    
   mov ax, data
   mov ds, ax
   
   mov bx,0
   mov ax,0
   mov cx,0
   ;mov i,1
     
;welcome    
   lea dx,welcome 
   mov ah,9
   int 21h 
;cr(new line)
   lea dx,cr
   mov ah,9
   int 21h   
;input first number
   lea dx,inputfirst
   mov ah,9
   int 21h 
   mov dx, offset str1
   mov ah, 0ah
   int 21h 
;cr(new line)
   lea dx,cr
   mov ah,9
   int 21h
;input second number
   lea dx,inputsecond
   mov ah,9
   int 21h  
   mov dx, offset str2
   mov ah, 0ah
   int 21h      
      
;convert string to the decimal byte by byte and mov to num1
     
       lea si,str1  ; mov si,offset str1 pointer to the first of string
       mov bl,si+1 
       mov l,bx   
       mov bx,1
   
x:     cmp bx,l
       jnbe  end1     ;if bx>l jump 
       inc bx
       mov ax,si+bx 
       and ax,0fh
       cmp ax,0dh
       jnz p
       mov ifneg,1 ;number is negative  
       jmp x

   
p:     mov cx,l 
       sub cx,bx
       inc cx  
   
pow:   cmp cx,0
       jz  addn
       imul ten 
       dec cx
       jmp pow
addn:  add num1,ax
       jmp x
    


end1:  cmp ifneg,1     ;if number is negative
       jnz s2
       mov ax,num1
       imul nega
       mov num1,ax
     

s2:    mov ifneg,0 ;ifneg=0 
       mov l,0     ;length=0
       mov bx,0
       mov cx,0
   
;convert string to the decimal byte by byte and mov to num2
   
       lea si,str2  ; mov si,offset str2 pointer to the first of string
       mov bl,si+1 
       mov l,bx   
       mov bx,1
   
x2:    cmp bx,l
       jnbe  end2     ;if bx>l jump 
       inc bx
       mov ax,si+bx 
       and ax,0fh
       cmp ax,0dh
       jnz p2
       mov ifneg,1 ;number is negative  
       jmp x2

   
p2:    mov cx,l 
       sub cx,bx
       inc cx  
   
pow2:   cmp cx,0
        jz  addn2
        imul ten 
        dec cx
        jmp pow2
addn2:  add num2,ax
        jmp x2
    


end2:  cmp ifneg,1    ;if number is negative
       jnz compare
       mov ax,num2
       imul nega
       mov num2,ax
   

compare:  
       ;cr(new line)
        lea dx,cr
        mov ah,9
        int 21h
        
        mov ax,num1
        cmp ax,num2   
        jg  num1big   ;if num1>num2  
        cmp ax,num2
        jl  num2big   ;if num1<num2  
       
        lea dx,equal
        mov ah,9               
        int 21h       ;else num1=num2             
        jmp end3 
        
num1big:lea dx,great
        mov ah,9               
        int 21h 
        jmp end3  
        
num2big:lea dx,less
        mov ah,9               
        int 21h 
        jmp end3 
        
end3:  

; wait for any Press any key:
    mov ah, 0
    int 16h 
      
    mov ax, 4c00h ; exit to operating system.
    int 21h    
ends

